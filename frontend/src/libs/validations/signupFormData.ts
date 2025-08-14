import { z } from "zod";

const password = z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .refine((pw) => /[a-z]/.test(pw), {
        message: "Password must contain at least one lowercase letter",
    })
    .refine((pw) => /[A-Z]/.test(pw), {
        message: "Password must contain at least one uppercase letter",
    })
    .refine((pw) => /\d/.test(pw), {
        message: "Password must contain at least one number",
    });

export const signupSchema = z
    .object({
        username: z
            .string()
            .min(3, { message: "Username must be at least 3 characters long" })
            .max(20, {
                message: "Username must be at most 20 characters long",
            }),
        email: z
            .email({ message: "Invalid email address" })
            .min(1, { message: "Email is required" }),
        password,
        confirmPassword: z.string().optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

export type SignupFormInput = z.input<typeof signupSchema>;
export type SignupFormOutput = Omit<
    z.infer<typeof signupSchema>,
    "confirmPassword"
>;
