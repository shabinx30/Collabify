import { getTokenFromLocalStorage } from "@/lib/utils";
import { InternalAxiosRequestConfig } from "axios";

const requestInterceptor = (config: InternalAxiosRequestConfig) => {
    const token = getTokenFromLocalStorage();

    if (token) {
        config.headers = config.headers || {};
        config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
};

export default requestInterceptor;
