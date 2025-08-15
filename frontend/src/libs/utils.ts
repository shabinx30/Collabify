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
