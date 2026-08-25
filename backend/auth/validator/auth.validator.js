import {z} from "zod";


const registerSchema=z.object({
    fullName:z.string()
    .min(2,"Full name must be at least 2 characters")
    .max(255,"Full name should be less than 255 character"), 
    
    email:z.string().email("Please Provide a valid email address"),
    
    password:z.string()
    .min(8,"Password must be atleast 8 characters long")
    .max(255,"Password must be less than 255 characters"),
    
    confirmPassword:z.string().min(8).max(255)
})






export {registerSchema}