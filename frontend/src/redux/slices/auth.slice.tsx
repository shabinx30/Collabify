import { TSignInForm } from "@/libs/validations/signinFromData";
import { SignupFormOutput } from "@/libs/validations/signupFormData";
import { signInUser, verifyOtp } from "@/services";
import { IAuthState, IUser } from "@/types/auth/signup.type";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import Success from "@/components/alert/Success";
import { jwtDecode } from "jwt-decode";

const initialState: IAuthState = {
    token: null,
    user: null,
    error: null,
    isLoading: false,
};

export const verifyUserOtp = createAsyncThunk(
    "auth/verify-otp",
    async (
        { formData, otp }: { formData: IUser & SignupFormOutput; otp: number },
        { rejectWithValue }
    ) => {
        try {
            const res = await verifyOtp(formData, otp);
            toast.custom((t) => <Success t={t} message="welcome" />);

            const user = jwtDecode(res.token) as IUser;

            return { ...res, user };
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue(error);
        }
    }
);

export const signIn = createAsyncThunk(
    "auth/sign-in",
    async (formData: TSignInForm, { rejectWithValue }) => {
        try {
            const res = await signInUser(formData);
            toast.custom((t) => <Success t={t} message="Sign in success" />);

            const user = jwtDecode(res.token) as IUser;

            return { ...res, user };
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
            })
            .addCase(signIn.pending, (state) => {
                (state.isLoading = true), (state.error = null);
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(signIn.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const { addUser, logout } = auth.actions;
export default auth.reducer;
