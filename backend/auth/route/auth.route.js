import { Router } from "express";



class AuthRoute{
    authRouter=Router();

    constructor(){
        this.authRouter.post('/register')
    }
}



