import { SignupFormOutput } from "@/libs/validations/signupFormData";
import axios from "axios";

const clientApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})

export const signup = async (formData: SignupFormOutput) => {
    try {
        const response = await clientApi.post('/signup', formData)
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}