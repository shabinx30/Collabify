import { AxiosError, InternalAxiosRequestConfig } from "axios";
import { clientApi } from "../client.api";

interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

const errorInterceptor = async (error: AxiosError) => {
    const originRequest = error.config as ExtendedAxiosRequestConfig;

    if (error.response?.status === 401 && !originRequest._retry) {
        originRequest._retry = true;

        const res = await clientApi.post("/refresh-token");
        const { accessToken } = res.data;

        clientApi.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${accessToken}`;
        originRequest.headers["Authorization"] = `Bearer ${accessToken}`;

        return clientApi(originRequest);
    }

    return Promise.reject(error);
};

export default errorInterceptor;
