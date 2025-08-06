import React, { Suspense, useEffect } from "react";
import { motion } from "framer-motion";
import { IRoleSelector, RoleType } from "@/types/auth/SignUpTypes";
import { useSearchParams } from "next/navigation";

const RoleSelector = ({ role, setRole }: IRoleSelector) => {
    const searchParams = useSearchParams();
    const typeParam = searchParams.get("type");

    const isValidType = (type: string | null): type is RoleType =>
        type === "brand" || type === "creator";

    useEffect(() => {
        isValidType(typeParam) ? typeParam : "brand";
    }, []);

    return (
        <div className="flex w-full relative rounded-xl overflow-hidden bg-gray-100 dark:bg-black">
            {/* Animated background */}
            <motion.div
                initial={false}
                animate={{
                    left: role === "brand" ? "0%" : "50%",
                }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                }}
                className="absolute h-full w-1/2 rounded-xl dark:bg-[#312500] bg-[#FFBF00] dark:border-2 dark:border-[#FFBF00] z-0"
            />

            {/* Buttons */}
            <div
                onClick={() => setRole(() => "brand")}
                className={`flex-1 flex py-3 justify-center z-10 cursor-pointer transition-colors duration-300 ${
                    role === "brand"
                        ? "dark:text-[#FFBF00]"
                        : "dark:text-gray-300"
                }`}
            >
                Join as Brand
            </div>
            <div
                onClick={() => setRole(() => "creator")}
                className={`flex-1 flex py-3 justify-center z-10 cursor-pointer transition-colors duration-300 ${
                    role === "creator"
                        ? "dark:text-[#FFBF00]"
                        : "dark:text-gray-300"
                }`}
            >
                Join as Creator
            </div>
        </div>
    );
};

export default RoleSelector;
