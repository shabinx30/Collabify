"use client";

import { authWithInsta } from "@/services";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const page = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const authCode = searchParams.get("code");

    useEffect(() => {
        if (authCode) {
            (async () => {
                router.replace("/auth/callback")
                await authWithInsta(authCode);
            })();
        } else {
            router.push("/");
        }
    }, []);

    return (
        <div className="flex flex-col items-center">
            <Image
                className="contrast-79 w-[18em]"
                src={"/animations/preloading_animation.gif"}
                alt="loading"
                width={100}
                height={100}
            />
            <p>We are gather your info...</p>
        </div>
    );
};

export default page;
