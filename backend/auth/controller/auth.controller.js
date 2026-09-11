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

        const storedState = req.cookies.oauth_state;


        const { accessToken, refreshToken, isNewUser } = await AuthService.googleCallback(code, state, storedState);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: envConfig.app.env === "PRODUCTION",
            sameSite: "strict",
            maxAge: 604800000
        })


        const statusCode = isNewUser ? 201 : 200;
        const message = isNewUser ? "User Registered successfully" : "User Logged in successfully";

        return res.status(statusCode).json({
            success: true,
            message: message,
            data: accessToken
        })

    }

    static loginController = async (req, res, next) => {
        const { email, password } = req.body;

        const { accessToken, refreshToken } = await AuthService.login(email, password);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: envConfig.app.env === "PRODUCTION",
            sameSite: "strict",
            maxAge: 604800000
        })

        return res.status(200).json({
            success: true,
            message: "User Logged in successfully",
            data: accessToken
        })
    }


    static forgetPassword = async (req, res, next) => {
        const { email } = req.body;

        await AuthService.forgetPassword(email);

        return res.status(200).json({
            success: true,
            message: "Password reset OTP sent successfully",
        })

    }

    static verifyOtp = async (req, res, next) => {
        const { otp, email } = res.body;
        await AuthService.verifyPassword(otp, email)

    }
}

export default AuthController