import { SignupFormOutput } from "@/libs/validations/signupFormData";
import { signup } from "@/services";
import { IAuthState } from "@/types/auth/signup.type";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: IAuthState = {
    token: null,
    user: null,
    error: null,
    isLoading: false,
};

export const signupUser = createAsyncThunk(
    "auth/signup",
    async (formData: SignupFormOutput, { rejectWithValue }) => {
        try {
            return await signup(formData);
            // console.log('success')
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue(error);
        }
    }
);

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
    extraReducers: (builder) => {
        builder
            .addCase(signupUser.pending, (state) => {
                (state.isLoading = true), (state.error = null);
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(signupUser.rejected, (state, action) => {
                (state.isLoading = false),
                    (state.error = action.payload as string);
            });
    },
});

export const { login, logout } = auth.actions;
export default auth.reducer;
