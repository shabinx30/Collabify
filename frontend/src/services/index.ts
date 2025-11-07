import { SignupFormOutput } from "@/lib/validations/signupFormData";
import { clientApi } from "./client.api";
import { IEmail } from "@/types/auth/otp.type";
import { TSignInForm } from "@/lib/validations/signinFromData";
import axios from "axios";
import { IDecode, RoleType } from "@/types/auth/signup.type";

export const sendOtp = async (data: IEmail) => {
    try {
        const response = await clientApi.post("/auth/signup", data);
        return response.data;
    } catch (error) {
        console.log(error, "Error while sending otp");
        throw error;
    }
};

export const signInUser = async (data: TSignInForm) => {
    try {
        const response = await clientApi.post("/auth/signin", data);
        return response.data;
    } catch (error) {
        console.log(error, "Error while signing in");
        throw error;
    }
};

export const verifyOtp = async (formData: SignupFormOutput, otp: number) => {
    try {
        const response = await clientApi.post("/auth/verify-otp", {
            ...formData,
            otp,
        });
        return response.data;
    } catch (error) {
        console.log(error, "Error while verifying otp");
        throw error;
    }
};

export const refreshToken = async () => {
    try {
        const response = await clientApi.post("/auth/refresh-token");
        return response.data;
    } catch (error) {
        console.log(error, "Error while refreshing token");
        throw error;
    }
};

export const resendOtp = async (data: IEmail) => {
    try {
        const response = await clientApi.post("/auth/resend-otp", data);
        return response.data;
    } catch (error) {
        console.log(error, "Error while resending otp");
        throw error;
    }
};

export const otpStatus = async (data: IEmail) => {
    try {
        const response = await clientApi.post("/auth/otp-status", data);
        return response.data;
    } catch (error) {
        console.log(error, "Error while grabbing otp status");
        throw error;
    }
};

export const findUser = async (userid: string) => {
    try {
        const response = await axios.get(
            `http://localhost:3000/api/user/${userid}`
        );
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const signInWithGoogle = async (data: {
    userData: IDecode;
    role?: RoleType;
}) => {
    try {
        const response = await clientApi.post("/auth/sign-in-google", data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const logout = async () => {
    try {
        const response = await clientApi.post("/auth/logout");
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const findCreators = async () => {
    try {
        const response = await clientApi.get("/admin/creators")
        return response.data
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const findBrands = async () => {
    try {
        const response = await clientApi.get("/admin/brands")
        return response.data
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const searchCreators = async () => {
    try {
        const response = await clientApi.get("/creators")
        return response.data
    } catch (error) {
        console.log(error);
        throw error;
    }
}
