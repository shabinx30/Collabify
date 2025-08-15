import { SignupFormOutput } from "@/libs/validations/signupFormData";
import { clientApi } from "./client.api";
import { IEmail } from "@/types/auth/otp.type";


export const sendOtp = async (data: IEmail) => {
    try {
        const response = await clientApi.post('/signup', data)
        return response.data
    } catch (error) {
        console.log(error, "Error while sending otp")
        throw error
    }
}

export const verifyOtp = async (formData: SignupFormOutput, otp: number) => {
    try {
        const response = await clientApi.post('/verify-otp', {...formData, otp})
        return response.data
    } catch (error) {
        console.log(error, "Error while verifying otp")
        throw error
    }
}

export const refreshToken = async () => {
    try {
        const response = await clientApi.post('/refresh-token')
        return response.data
    } catch (error) {
        console.log(error, "Error while refreshing token")
        throw error
    }
}

export const resendOtp = async (data: IEmail) => {
    try {
        const response = await clientApi.post('/resend-otp', data)
        return response.data
    } catch (error) {
        console.log(error, "Error while resending otp")
        throw error
    }
}

export const otpStatus = async (data: IEmail) => {
    try {
        const response = await clientApi.post('/otp-status', data)
        return response.data
    } catch (error) {
        console.log(error, "Error while grabbing otp status")
        throw error
    }
}