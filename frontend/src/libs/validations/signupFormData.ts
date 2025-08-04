import { z } from "zod";

const profile = z.object({
    profilePicture: z
        .instanceof(File)
        .refine((file) => file.size <= 5 * 1024 * 1024, {
            message: "Image must be under 5MB",
        })
        .refine((file) => ["image/jpeg", "image/png"].includes(file.type), {
            message: "Only JPEG or PNG images are allowed",
        }),
});

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
        profile,
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
        confirmPassword: z.string(),
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
