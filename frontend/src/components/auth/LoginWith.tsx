import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa6";
import { useGoogleLogin } from "@react-oauth/google";
import { signInWithGoogle } from "@/services";

const LoginWith = () => {
    const login = useGoogleLogin({
        onSuccess: async ({ access_token }) => {
            console.log(access_token);
            await signInWithGoogle({ token: access_token });
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
