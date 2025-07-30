"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SignUpForm from "@/components/auth/SignUpForm";
import { UserType } from "@/types/auth/SignUpTypes";
import { useSearchParams } from "next/navigation";

const SignUp = () => {
    const searchParams = useSearchParams();
    const typeParam = searchParams.get("type");

    const isValidType = (type: string | null): type is UserType =>
        type === "brand" || type === "creator";

    const [userType, setUserType] = useState<UserType>(
        isValidType(typeParam) ? typeParam : "brand"
    );

    return (
        <main className="flex flex-col md:flex-row gap-8 md:gap-0">
            <section className="bg-gray-50 flex-1/4 dark:bg-black">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:px-0 lg:py-0">
                    <div className="w-full bg-white rounded-3xl shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-[#1b1b1b] dark:border-[#2b2b2b]">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Create your account
                            </h1>
                            <div className="flex w-full relative rounded-xl overflow-hidden bg-gray-50 dark:bg-black">
                                {/* Animated background */}
                                <motion.div
                                    initial={false}
                                    animate={{
                                        left:
                                            userType === "brand" ? "0%" : "50%",
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 30,
                                    }}
                                    className="absolute h-full w-1/2 rounded-xl bg-[#312500] border-2 border-[#FFBF00] z-0"
                                />

                                {/* Buttons */}
                                <div
                                    onClick={() => setUserType("brand")}
                                    className={`flex-1 flex py-3 justify-center z-10 cursor-pointer transition-colors duration-300 ${
                                        userType === "brand"
                                            ? "text-[#FFBF00]"
                                            : "text-gray-300"
                                    }`}
                                >
                                    Join as Brand
                                </div>
                                <div
                                    onClick={() => setUserType("creator")}
                                    className={`flex-1 flex py-3 justify-center z-10 cursor-pointer transition-colors duration-300 ${
                                        userType === "creator"
                                            ? "text-[#FFBF00]"
                                            : "text-gray-300"
                                    }`}
                                >
                                    Join as Creator
                                </div>
                            </div>
                            {/* sign up form */}
                            <SignUpForm userType={userType} />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default SignUp;
