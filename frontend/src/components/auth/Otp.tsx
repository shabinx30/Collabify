import { otpStatus, resendOtp } from "@/services";
import React, { useEffect, useRef, useState } from "react";
import { FiClock } from "react-icons/fi";
import { IOtp } from "../../types/auth/otp.type";
import { RootState } from "@/redux/store/store";
import { useSelector } from "react-redux";

const Otp = ({ isFormFilled, lastTime }: IOtp) => {
    const length = 4;
    const [otp, setOtp] = useState(Array(length).fill(""));
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
    const { user } = useSelector((state: RootState) => state.auth);
    const [time, setTime] = useState<number>(lastTime);

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
        index: number
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
        console.log("OTP:", otp.join(""));
    };

    const handleResend = async () => {
        if (user?.email) {
            const data = await resendOtp({ email: user?.email });
            console.log("from resend otp.tsx", data);
            if (data.message == "success") {
                setTime(() => 60);
                startTimer();
            }
        }
    };

    const interval = useRef<number | null>(null);

    const startTimer = () => {
        stopTimer(); 
        interval.current = window.setInterval(() => {
            setTime((p) => p - 1);
        }, 1000);
    };

    const stopTimer = () => {
        if (interval.current !== null) {
            clearInterval(interval.current);
        }
    };

    useEffect(() => {
        if (isFormFilled) {
            startTimer();
        } else {
            stopTimer();
        }
        return stopTimer;
    }, [isFormFilled]);

    useEffect(() => {
        if (time == 0 && interval.current !== null) {
            clearInterval(interval.current);
            interval.current = null;
        }
    }, [time]);

    // time syncer
    useEffect(() => {
        console.log("mounted ", time);
        if (lastTime <= 0 && user?.email) {
            (async function () {
                const data = await otpStatus({ email: user.email });
                console.log("from time sync", data);
                setTime(() => {
                    if (data.exist === false) {
                        return 0;
                    }
                    const timeLeft =
                        (new Date(data.sendTime).getTime() -
                            new Date().getTime()) /
                            1000 +
                        60;
                    if (timeLeft <= 0) {
                        return 0;
                    }
                    startTimer();
                    return Math.round(timeLeft);
                });
            })();
        }
        return stopTimer;
    }, []);

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
                    <p className="text-sm text-center text-amber-400">
                        {user?.email}
                    </p>
                </div>
                <div className="flex justify-center gap-4 text-white">
                    {otp.map((value, i) => (
                        <input
                            key={i}
                            ref={(el) => {
                                inputsRef.current[i] = el;
                            }}
                            className="w-[3em] h-[3em] border-2 border-gray-500 focus:border-white rounded-xl text-center outline-none"
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
                    <span className="text-amber-400">
                        {`${Math.floor(time / 60)}:${(time % 60)
                            .toString()
                            .padStart(2, "0")}`}
                    </span>
                    sec
                    <span
                        onClick={() => time === 0 && handleResend()}
                        className={
                            time == 0
                                ? "text-amber-400 hover:underline cursor-pointer"
                                : "text-gray-400 cursor-not-allowed"
                        }
                    >
                        Resend OTP
                    </span>
                </p>
                <button
                    type="submit"
                    className="bg-amber-400 w-full py-2 text-black rounded-2xl cursor-pointer"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Otp;
