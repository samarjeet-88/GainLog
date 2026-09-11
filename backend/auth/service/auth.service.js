import logger from "../../shared/config/logConfig.js"
import Transaction from "../../shared/db/TransactionClass.js";
import ApiError from "../../shared/utils/ApiError.js";
import AuthRepository from "../repository/auth.repository.js";
import envConfig from "../../shared/config/envConfig.js";
import jwt from "jsonwebtoken"
import BaseService from "../../shared/service/BaseService.js";
import crypto from "crypto";
import googleOauth from "./oauth.service.js";

class AuthService {

    static generateToken = (payload, expireTime = "15m") => {
        const token = jwt.sign(
            { payload: payload },
            envConfig.jwt.secret,
            {
                expiresIn: expireTime
            }
        )
        return token;
    }

    static generateUserTokens = async (tx, userId) => {
        const accessToken = AuthService.generateToken({ sub: userId }, envConfig.jwt.accessTokenExpiryTime);

        const refreshToken = crypto.randomBytes(32).toString("base64url");
        const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

        await AuthRepository.refreshTokenCreateRepo(tx, userId, refreshTokenHash, expiresAt);

        return { accessToken, refreshToken };
    }


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
}


export default AuthService;