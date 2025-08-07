import axios from "axios";
import requestInterceptor from "./interceptors/request.interceptor";
import errorInterceptor from "./interceptors/error.interceptor";

export const clientApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})

clientApi.interceptors.request.use(requestInterceptor)
clientApi.interceptors.response.use(res => res, errorInterceptor)