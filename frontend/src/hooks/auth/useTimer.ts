import { otpStatus, resendOtp } from "@/services";
import { IUser } from "@/types/auth/signup.type";
import { useEffect, useRef, useState } from "react";

const useTimer = (user: IUser | null) => {
    const [time, setTime] = useState<number>(60);
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

    const handleResend = async () => {
        if (user?.email) {
            const data = await resendOtp({ email: user?.email });
            if (data.message == "success") {
                setTime(() => 60);
                startTimer();
            }
        }
    };

    useEffect(() => {
        if (user?.username) {
            startTimer();
        } else {
            stopTimer();
        }
        return stopTimer;
    }, [user]);

    useEffect(() => {
        if (time == 0 && interval.current !== null) {
            clearInterval(interval.current);
            interval.current = null;
        }
    }, [time]);

    useEffect(() => {
        if (user?.email) {
            (async function () {
                const data = await otpStatus({ email: user.email });
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

    return { time, handleResend };
};

export default useTimer;
