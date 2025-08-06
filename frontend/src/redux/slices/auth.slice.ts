import { IAuthState } from "@/types/auth/signup.type";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState: IAuthState = {
    token: null,
    user: null,
    error: null,
    isLoading: false,
};

const auth = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            (state.user = action.payload.user),
                (state.token = action.payload.token);
        },
        logout: (state) => {
            (state.user = null), (state.token = null);
        },
    },
});

export const { login, logout } = auth.actions
export default auth.reducer