import { Router } from "express";
import AuthController from "../controller/auth.controller.js";
import validateMiddleware from "../../shared/middleware/validatorMIddleware.js";
import { registerSchema, googleCallbackSchema, loginSchema, forgetPasswordSchema, verifyOtpSchema } from "../validator/auth.validator.js";
import asyncHandler from "../../shared/utils/asyncHandler.js";
import validateQueryMiddleware from "../../shared/middleware/validatorQueryMiddleware.js";


const authRouter = Router();


authRouter.post('/register',
    validateMiddleware(registerSchema),
    asyncHandler(AuthController.registerController)
)


authRouter.get("/google",
    asyncHandler(AuthController.googleLogin)
)

authRouter.get("/google/callback",
    validateQueryMiddleware(googleCallbackSchema),
    asyncHandler(AuthController.googleCallback)
)

authRouter.post('/login',
    validateMiddleware(loginSchema),
    asyncHandler(AuthController.loginController)
)


authRouter.post('/forgot-password',
    validateMiddleware(forgetPasswordSchema),
    asyncHandler(AuthController.forgetPassword)
)

authRouter.post('/verify-otp', validateMiddleware(verifyOtpSchema))

export default authRouter;