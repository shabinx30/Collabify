"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

const AddButton = ({
    children,
    className,
    href,
}: {
    children: React.ReactNode;
    className: string;
    href?: string;
}) => {
    const router = useRouter();
    const { user } = useSelector((state: RootState) => state.auth);

    if (href && href?.endsWith("instagram")) {
        href += `?userId=${user?.userId}`;
    }

    return (
        <button
            onClick={() => router.push(href!)}
            className={className}
            type="button"
        >
            {children}
        </button>
    );
};

export default AddButton;
