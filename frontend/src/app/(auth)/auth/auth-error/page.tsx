"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PiWarningCircle } from "react-icons/pi";

export default function Page() {
    const router = useRouter();
    const [seconds, setSeconds] = useState(5);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setSeconds((prev) => Math.max(prev - 1, 0));
        }, 1000);

        const timeoutId = setTimeout(() => {
            router.push("/");
        }, 5000);

        return () => {
            clearInterval(intervalId);
            clearTimeout(timeoutId);
        };
    }, [router]);

    return (
        <div className="flex flex-col justify-center items-center gap-2 text-center py-4">
            <span className="rounded-full bg-red-200 dark:bg-red-300 mb-4 p-3">
                <PiWarningCircle size={50} className="text-red-500" />
            </span>
            Authentication has been failed, please try again later.
            <p className="text-sm text-gray-500 dark:text-gray-400">
                you'll be redired to the home in {seconds}s
            </p>
        </div>
    );
}
