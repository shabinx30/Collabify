import React, { useEffect, useRef, useState } from "react";
import { FiClock } from "react-icons/fi";
import { AppDispatch, RootState } from "@/redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { verifyUserOtp } from "@/redux/slices/auth.slice";
import { IUser } from "@/types/auth/signup.type";
import { SignupFormOutput } from "@/lib/validations/signupFormData";
import useTimer from "@/hooks/auth/useTimer";
import { useRouter } from "next/navigation";
import Error from "../alert/Error";
import toast from "react-hot-toast";

const Otp = () => {
    const length = 4;
    const [otp, setOtp] = useState(Array(length).fill(""));
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
    const { user, isLoading, error } = useSelector(
        (state: RootState) => state.auth,
    );
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const handleChange = (value: string, index: number) => {
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);

        if (value && index < length - 1) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number,
    ) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const pasteData = e.clipboardData
            .getData("text")
            .slice(0, length)
            .split("");
        if (pasteData.every((char) => /^\d$/.test(char))) {
            setOtp((prev) => pasteData.map((char, i) => char || prev[i]));
            inputsRef.current[Math.min(pasteData.length, length) - 1]?.focus();
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const Enteredotp = otp.join("");
        if (Enteredotp.length !== 4) {
            return; // error
        }
        if (!user?.username) {
            return;
        }
        dispatch(
            verifyUserOtp({
                formData: user as IUser & SignupFormOutput,
                otp: Number(Enteredotp),
                router,
            }),
        );
    };

    // timer manager
    const { time, handleResend } = useTimer(user);

    useEffect(() => {
        if (error) {
            toast.custom((t) => (
                <Error
                    t={t}
                    message={error?.message || "Something went wrong"}
                />
            ));
        }
    }, [error]);

    return (
        <div className="section min-w-full flex flex-col gap-10 items-center justify-center">
            <h2 className="text-center text-2xl font-semibold">
                Enter Your OTP
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <p className="text-sm">
                        {
                            "We have sent an OTP (One Time Password) to your email"
                        }
                    </p>
                    <p className="text-sm text-center text-lime-400">
                        {user?.email}
                    </p>
                </div>
                <div className="flex justify-center gap-4">
                    {otp.map((value, i) => (
                        <input
                            key={i}
                            ref={(el) => {
                                inputsRef.current[i] = el;
                            }}
                            className="w-[3em] h-[3em] border-2 border-gray-300 dark:border-gray-500 focus:border-black dark:focus:border-white rounded-xl text-center outline-none"
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={value}
                            onChange={(e) => handleChange(e.target.value, i)}
                            onKeyDown={(e) => handleKeyDown(e, i)}
                            onPaste={handlePaste}
                        />
                    ))}
                </div>
                <p className="text-sm text-center flex justify-center gap-1 items-center">
                    <FiClock />
                    <span className="text-lime-400">
                        {`${Math.floor(time / 60)}:${(time % 60)
                            .toString()
                            .padStart(2, "0")}`}
                    </span>
                    sec
                    <span
                        onClick={() => time === 0 && handleResend()}
                        className={
                            time == 0
                                ? "text-lime-400 hover:underline cursor-pointer"
                                : "text-gray-400 cursor-not-allowed"
                        }
                    >
                        Resend OTP
                    </span>
                </p>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-lime-400 w-full py-2 text-black rounded-2xl cursor-pointer"
                >
                    {isLoading ? "Verifying..." : "Submit"}
                </button>
            </form>
        </div>
    );
};

export default Otp;
