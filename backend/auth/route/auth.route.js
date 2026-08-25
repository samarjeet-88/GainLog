import { Router } from "express";
import AuthController from "../controller/auth.controller.js";
import validateMiddleware from "../../shared/middleware/validatorMIddleware.js";
import { registerSchema } from "../validator/auth.validator.js";



const authRouter=Router();


authRouter.post('/register',validateMiddleware(registerSchema),
AuthController.registerController)




export default authRouter;