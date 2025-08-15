import { RoleType } from "@/types/auth/signup.type";

export const getTokenFromLocalStorage = () => {
    const persistedAuth = localStorage.getItem("persist:root");
    if (persistedAuth) {
        const authState = JSON.parse(persistedAuth).auth;
        if (authState) {
            const auth = JSON.parse(authState);
            const token = auth?.token;
            if (token) {
                return token;
            }
        }
    }
    return null
};

export const isValidUserType = (type: string | null): type is RoleType =>
        type === "brand" || type === "creator";