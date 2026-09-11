import { z } from "zod";


const registerSchema = z.object({
    fullName: z.string()
        .min(2, "Full name must be at least 2 characters")
        .max(255, "Full name should be less than 255 character"),

    email: z.email("Please Provide a valid email address"),

    password: z.string()
        .min(8, "Password must be atleast 8 characters long")
        .max(255, "Password must be less than 255 characters"),

    confirmPassword: z.string()
})


const googleCallbackSchema = z.object({
    code: z.string(),
    state: z.string()
})

const loginSchema = z.object({
    email: z.email("Please `provide a valid email address"),
    password: z.string()
})

const forgetPasswordSchema = z.object({
    email: z.email("Please `provide a valid email address")
})

const verifyOtpSchema = z.object({
    email: z.string(),
    otp: z.string().length(6, "Otp must be of length 6")
})



export {
    registerSchema, googleCallbackSchema, loginSchema,
    forgetPasswordSchema, verifyOtpSchema
}