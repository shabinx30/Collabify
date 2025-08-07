import { SignupFormOutput } from "@/libs/validations/signupFormData";
import { clientApi } from "./client.api";


export const signup = async (formData: SignupFormOutput) => {
    try {
        const response = await clientApi.post('/signup', formData)
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}