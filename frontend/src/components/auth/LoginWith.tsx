import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa6";
import { useGoogleLogin } from "@react-oauth/google";
import { RoleType } from "@/types/auth/signup.type";
import { useDispatch } from "react-redux";
import { signInWith } from "@/redux/slices/auth.slice";
import { AppDispatch } from "@/redux/store/store";
import { useRouter } from "next/navigation";

const LoginWith = ({ role }: { role?: RoleType }) => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter()

    const login = useGoogleLogin({
        onSuccess: async ({ access_token }) => {
            dispatch(signInWith({ token: access_token, role, router }));
        },
        onError: () => console.log("login has been failed"),
    });

    return (
        <section className="flex gap-2">
            <div
                onClick={() => login()}
                className="flex flex-1 justify-center p-3 bg-[#3b3b3b] rounded-xl cursor-pointer"
            >
                <FaGoogle />
            </div>
            <div className="flex flex-1 justify-center p-3 bg-[#3b3b3b] rounded-xl cursor-pointer">
                <FaFacebookF />
            </div>
        </section>
    );
};

export default LoginWith;
