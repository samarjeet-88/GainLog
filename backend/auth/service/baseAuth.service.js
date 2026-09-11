import jwt from "jsonwebtoken";
import crypto from "crypto";
import envConfig from "../../shared/config/envConfig.js";
import AuthRepository from "../repository/auth.repository.js";

class BaseAuthService {
    static generateToken = (payload, expireTime = "15m") => {
        const token = jwt.sign(
            { payload: payload },
            envConfig.jwt.secret,
            {
                expiresIn: expireTime
            }
        );
        return token;
    };

    static generateUserTokens = async (tx, userId) => {
        const accessToken = BaseAuthService.generateToken({ sub: userId }, envConfig.jwt.accessTokenExpiryTime);

        const refreshToken = crypto.randomBytes(32).toString("base64url");
        const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

        await AuthRepository.refreshTokenCreateRepo(tx, userId, refreshTokenHash, expiresAt);

        return { accessToken, refreshToken };
    };

    static generatePasswordToken = (length) => {
        const min = 10 ** (length - 1);
        const max = 10 ** (length);
        const token = crypto.randomInt(min, max);
        return token;
    };
}

export default BaseAuthService;
