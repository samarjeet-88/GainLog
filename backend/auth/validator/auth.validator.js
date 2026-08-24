import {z} from "zod";


const registerSchema=z.object({
    fullName:z.string.min(2).max(255),
    password:z.string().min(8).max(255),
    confirmPassword:z.string().min(8).max(255)
})






export const {registerSchema}