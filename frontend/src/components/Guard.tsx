"use client";
import { RootState } from "@/redux/store/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Guard = ({
    children,
    path,
}: {
    children: React.ReactNode;
    path: "auth" | "in";
}) => {
    const { user } = useSelector((state: RootState) => state.auth);
    const router = useRouter();
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        if (path === "in" && !user) {
            router.replace("/signin"); // replace avoids back button loop
        } else if (path === "auth" && user) {
            router.replace("/");
        } else {
            setChecked(true);
        }
    }, [user, path, router]);

    if (!checked) return null; // don’t render children until auth check

    return <>{children}</>;
};

export default Guard;
