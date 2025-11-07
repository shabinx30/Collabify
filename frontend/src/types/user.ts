import { Document } from "mongoose";

export interface IUser extends Document {
    username?: string;
    email: string;
    password?: string;
    role: "brand" | "creator";
    categories?: string[];
    profile?: string;
    amount?: number;
    socialLinks?: string[];
    location?: string;
    companyName?: string;
    isVerified: boolean;
}
