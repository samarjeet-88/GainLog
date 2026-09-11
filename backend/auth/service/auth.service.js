import logger from "../../shared/config/logConfig.js"
import Transaction from "../../shared/db/TransactionClass.js";
import ApiError from "../../shared/utils/ApiError.js";
import AuthRepository from "../repository/auth.repository.js";
import envConfig from "../../shared/config/envConfig.js";
import BaseService from "../../shared/service/BaseService.js";
import crypto from "crypto";
import googleOauth from "./oauth.service.js";
import RedisClass from "../../shared/redis/redisClass.js";
import RedisService from "../../shared/redis/redisService.js";
import BaseAuthService from "./baseAuth.service.js";

class AuthService extends BaseAuthService {

    static #redisClient = RedisClass.getInstance().getClient();


    static register = async (email, password, confirmPassword, fullName) => {

        logger.info("Entered register Service");

        const result = await Transaction.runTransaction(async (tx) => {
            const emailRes = await AuthRepository.emailAlreadyPresentRepo(tx, email);

            if (emailRes.rowCount == 1) {
                throw ApiError.badRequest("Email already Present")
            }

            if (password != confirmPassword) {
                throw ApiError.badRequest("Password do not match")
            }

            const hashedPassword = await BaseService.hashValue(password);

            const id = BaseService.generateId();

            await AuthRepository.userCreateRepo(tx, id, fullName, email, hashedPassword);
            logger.info("User Inserted")


            const { accessToken, refreshToken } = await AuthService.generateUserTokens(tx, id);

            logger.info("Auth service code finish")

            return { accessToken, refreshToken }
        })

        return result;
    }


    static getAuthorizationUrl = async () => {

        const state = crypto.randomBytes(32).toString("hex");
        const params = new URLSearchParams({
            client_id: envConfig.googleOAuth.clientId,
            redirect_uri: envConfig.googleOAuth.redirectUrl,
            response_type: "code",
            scope: "openid email profile",
            state,
        });

        const url =
            `${envConfig.googleOAuth.googleLink}?${params.toString()}`;

        return { url, state }
    }

    static googleCallback = async (code, state, storedState) => {

        if (!storedState || storedState !== state)
            throw ApiError.badRequest("Invalid OAuth State");


        const token = await googleOauth.googleExchangeCode(code);

        const payload = await googleOauth.verifyIdToken(token);

        const result = await Transaction.runTransaction(async (tx) => {

            let user = await AuthRepository.findUserByGoogleIdOrEmail(tx, payload.googleId, payload.email);
            let isNewUser = false;

            if (!user) {
                const newUserId = BaseService.generateId();
                await AuthRepository.userCreateOAuthRepo(tx, newUserId, payload.fullName, payload.email, payload.googleId);
                user = { id: newUserId };
                isNewUser = true;
            } else if (!user.googleId) {
                await AuthRepository.linkGoogleIdRepo(tx, user.id, payload.googleId);
            }

            const { accessToken, refreshToken } = await AuthService.generateUserTokens(tx, user.id);

            return { accessToken, refreshToken, isNewUser };
        });

        return result;
    }

    static login = async (email, password) => {

        const result = await Transaction.runTransaction(async (tx) => {
            const user = await AuthRepository.findUserByEmail(tx, email);
            if (!user) throw ApiError.badRequest("User does not exist");

            const isPasswordValid = await BaseService.hashValue(password) == user.password;
            if (!isPasswordValid) throw ApiError.badRequest("Password does not match")

            const { accessToken, refreshToken } = await AuthService.generateUserTokens(tx, user.id);

            return { accessToken, refreshToken }
        })

        return result;
    }

    static forgetPassword = async (email) => {

        const result = await Transaction.runTransaction(async (tx) => {

            const user = await AuthRepository.findUserByEmail(tx, email);
            if (!user) throw ApiError.badRequest("User does not exist");
            return user;
        })
        const passwordToken = AuthService.generatePasswordToken(6);
        const options = { EX: 300 }

        await RedisService.setString(AuthService.#redisClient,
            `passwordReset:otp:${email}`, passwordToken, options);

        logger.info("Password Token set successfully")
    }


    static verifyPassword = async (otp, email) => {

        const storedOtp = await RedisService.getString(`passwordReset:otp:${email}`);
        if (!storedOtp) throw ApiError.badRequest("OTP has expired");
        if (otp !== storedOtp) throw ApiError.badRequest("OTP is wrong");
    }
}


export default AuthService;