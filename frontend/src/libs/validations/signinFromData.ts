import { z } from "zod";

export const signInSchema = z.object({
    email: z.email().min(1, "Email is requied"),
    password: z.string().min(1, "Password is requied")
})

export type TSignInForm = z.input<typeof signInSchema>