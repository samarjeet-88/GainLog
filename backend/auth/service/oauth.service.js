import envConfig from "../../shared/config/envConfig"
import ApiError from "../../shared/utils/ApiError"
import { OAuth2Client } from "google-auth-library"

class googleOauth {

    static googleClient = new OAuth2Client(envConfig.googleOAuth.clientId);

    static googleExchangeCode = async (code) => {
        const response = await fetch("https://oauth2.googleapis.com/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                client_id: envConfig.googleOAuth.clientId,
                client_secret: envConfig.googleOAuth.clientSecret,
                code,
                redirect_uri: envConfig.googleOAuth.redirectUrl,
                grant_type: "authorization_code"
            })
        })


        if (!response.ok) throw new ApiError.badRequest("Invalid Credentials");

        return response.json();
    }


    static verifyIdToken = async (token) => {

        const ticket = await this.googleClient.verifyIdToken({
            idToken: token,
            audience: envConfig.googleOAuth.clientId,
        });

        const payload = ticket.getPayload();

        if (!payload) throw new ApiError.badRequest("Invalid google token ID");

        if (!payload.email) throw new ApiError.badRequest("Email not present in the token");

        if (!payload.email_verified) throw new ApiError.badRequest("Email not verified");

        return {
            googleId: payload.sub,
            email: payload.email,
            fullName: payload.name
        };

    }
}

export default googleOauth;