import { SignupFormOutput } from "@/libs/validations/signupFormData";
import { clientApi } from "./client.api";


export const signup = async (formData: SignupFormOutput) => {
    try {
        const response = await clientApi.post('/signup', formData)
        return response.data
    } catch (error) {
        console.log(error, "Error while signup")
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