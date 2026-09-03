import logger from "../../shared/config/logConfig.js"
import Transaction from "../../shared/db/TransactionClass.js";
import ApiError from "../../shared/utils/ApiError.js";
import AuthRepository from "../repository/auth.repository.js";
import bcrypt from "bcrypt";
import envConfig from "../../shared/config/envConfig.js";
import jwt from "jsonwebtoken"
import BaseService from "../../shared/service/BaseService.js";
import crypto from "crypto";

class AuthService {


    static hashValue = async (value) => {
        const hashedPassword = await bcrypt.hash(value, 12);
        return hashedPassword;
    }


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

            const hashedPassword = await AuthService.hashValue(password);

            const id = BaseService.generateId();

            await AuthRepository.userCreateRepo(tx, id, fullName, email, hashedPassword);
            logger.info("User Inserted")


            const accessToken = AuthService.generateToken(id, envConfig.jwt.accessTokenExpiryTime);

            const refreshToken = crypto.randomBytes(32).toString("base64url");
            const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");
            const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

            await AuthRepository.refreshTokenCreateRepo(tx, id, refreshTokenHash, expiresAt)

            logger.info("Auth service code finish")

            return { accessToken, refreshToken }
        })

        return result;
    }
}


export default AuthService;