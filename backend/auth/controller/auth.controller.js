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
            secure: envConfig.app.env === "production",
            sameSite: "strict",
            maxAge: 604800000
        })

        return res.status(201).json({
            success: true,
            message: "User Registered successfully",
            data: accessToken
        })
    }
}

export default AuthController