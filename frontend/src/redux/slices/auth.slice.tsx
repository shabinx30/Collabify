import { TSignInForm } from "@/lib/validations/signinFromData";
import { SignupFormOutput } from "@/lib/validations/signupFormData";
import { logout, sendOtp, signInUser, signInWithGoogle, verifyOtp } from "@/services";
import { IAuthState, IDecode, IError, IUser, RoleType } from "@/types/auth/signup.type";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import Success from "@/components/alert/Success";
import { jwtDecode } from "jwt-decode";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const initialState: IAuthState = {
    token: null,
    user: null,
    error: null,
    isLoading: false,
};

export const signUpUser = createAsyncThunk(
    "auth/sign-up",
    async (
        {
            email,
        }: {
            email: string;
        },
        { rejectWithValue },
    ) => {
        try {
            await sendOtp({email});
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue(error);
        }
    },
);
export const verifyUserOtp = createAsyncThunk(
    "auth/verify-otp",
    async (
        {
            formData,
            otp,
            router,
        }: {
            formData: IUser & SignupFormOutput;
            otp: number;
            router: AppRouterInstance;
        },
        { rejectWithValue },
    ) => {
        try {
            const res = await verifyOtp(formData, otp);
            toast.custom((t) => <Success t={t} message="welcome" />);

            const user = jwtDecode(res.token) as IUser;

            router.push("/auth/add-accounts");

            return { ...res, user };
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue(error);
        }
    },
);

export const signIn = createAsyncThunk(
    "auth/sign-in",
    async (
        {
            formData,
            router,
        }: { formData: TSignInForm; router: AppRouterInstance },
        { rejectWithValue },
    ) => {
        try {
            const res = await signInUser(formData);
            toast.custom((t) => <Success t={t} message="Sign in success" />);

            const user = jwtDecode(res.token) as IUser;
            const { username } = user;

            router.push(`/${username}`);

            return { ...res, user };
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue(error);
        }
    },
);

export const signInWith = createAsyncThunk(
    "auth/sign-in-google",
    async (
        {
            userData,
            role,
            router,
        }: { userData: IDecode; role?: RoleType; router: AppRouterInstance },
        { rejectWithValue },
    ) => {
        try {
            const res = await signInWithGoogle({ userData, role });

            toast.custom((t) => <Success t={t} message="Sign in success" />);

            const user = jwtDecode(res.token) as IUser;
            const { username } = user;

            router.push(`/${username}`);

            return { ...res, user };
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue(error);
        }
    },
);

export const logoutUser = createAsyncThunk(
    "auth/logout",
    async (router: AppRouterInstance, { rejectWithValue }) => {
        try {
            await logout();
            toast.custom((t) => (
                <Success t={t} message="Successfully logged out" />
            ));
            router.push("/");
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue(error);
        }
    },
);

const auth = createSlice({
    name: "auth",
    initialState,
    reducers: {
        addUser: (state, action) => {
            ((state.user = action.payload.user),
                (state.token = action.payload.token));
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(verifyUserOtp.pending, (state) => {
                ((state.isLoading = true), (state.error = null));
            })
            .addCase(verifyUserOtp.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(verifyUserOtp.rejected, (state, action) => {
                state.error = action.payload as IError;
                state.isLoading = false;
            })
            .addCase(signIn.pending, (state) => {
                ((state.isLoading = true), (state.error = null));
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(signIn.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as IError;
            })
            .addCase(signInWith.pending, (state) => {
                ((state.isLoading = true), (state.error = null));
            })
            .addCase(signInWith.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(signInWith.rejected, (state, action) => {
                state.error = action.payload as IError;
                state.isLoading = false;
            })
            .addCase(signUpUser.pending, (state) => {
                ((state.isLoading = true), (state.error = null));
            })
            .addCase(signUpUser.fulfilled, (state) => {
                state.isLoading = false;
                state.error = null;
            })
            .addCase(signUpUser.rejected, (state, action) => {
                state.error = action.payload as IError;
                state.isLoading = false;
            })
            .addCase(logoutUser.pending, (state) => {
                ((state.isLoading = true), (state.error = null));
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.token = null;
                state.error = null;
                state.isLoading = false;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.error = action.payload as IError;
                state.isLoading = false;
            });
    },
});

export const { addUser } = auth.actions;
export default auth.reducer;
