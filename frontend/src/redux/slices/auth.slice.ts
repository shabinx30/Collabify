import { SignupFormOutput } from "@/libs/validations/signupFormData";
import { verifyOtp } from "@/services";
import { IAuthState } from "@/types/auth/signup.type";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";

const initialState: IAuthState = {
    token: null,
    user: null,
    error: null,
    isLoading: false,
};

export const verifyUserOtp = createAsyncThunk(
    "auth/verify-otp",
    async (formData: SignupFormOutput, { rejectWithValue }) => {
        try {
            return await verifyOtp(formData);
        } catch (error) {
            if (isAxiosError(error) && error.response) {
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
        addUser: (state, action) => {
            (state.user = action.payload.user),
                (state.token = action.payload.token);
        },
        logout: (state) => {
            (state.user = null), (state.token = null);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(verifyUserOtp.pending, (state) => {
                (state.isLoading = true), (state.error = null);
            })
            .addCase(verifyUserOtp.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(verifyUserOtp.rejected, (state, action) => {
                (state.isLoading = false),
                    (state.error = action.payload as string);
            });
    },
});

export const { addUser, logout } = auth.actions;
export default auth.reducer;
