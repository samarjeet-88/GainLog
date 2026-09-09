import envConfig from "../../shared/config/envConfig.js";
import AuthService from "../service/auth.service.js"



class AuthController {

    static registerController = async (req, res, next) => {
        const { email, password, confirmPassword, fullName } = req.body;

        const { accessToken, refreshToken } =
            await AuthService.register(email, password, confirmPassword, fullName)

        // res.cookie("accessToken", accessToken, {
        //     httpOnly: true,
        //     secure: envConfig.app.env === "production",
        //     sameSite: "strict",
        //     maxAge: 900000
        // })

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: envConfig.app.env === "PRODUCTION",
            sameSite: "strict",
            maxAge: 604800000
        })

        return res.status(201).json({
            success: true,
            message: "User Registered successfully",
            data: accessToken
        })
    }

    static googleLogin = async (req, res, next) => {

        const { url, state } = await AuthService.getAuthorizationUrl();

        res.cookie("oauth_state", state, {
            httpOnly: true,
            secure: envConfig.app.env === "PRODUCTION",
            sameSite: "strict",
            maxAge: 10 * 60 * 1000

        })

        return res.redirect(url);
    }

    static googleCallback = async (req, res, next) => {
        const { code, state } = req.query;
    }
}

export default AuthController