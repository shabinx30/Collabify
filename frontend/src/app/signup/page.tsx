"use client";

import { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const SignUp = () => {
    const [valid] = useState({
        profile: { status: true, message: "" },
        name: { status: true, message: "" },
        email: { status: true, message: "" },
        password: { status: true, message: "" },
        confirmPassword: { status: true, message: "" },
    });

    const [userType, setUserType] = useState<string>("brand");

    const router = usePathname();
    useEffect(() => {
        console.log(router);
    }, [router]);

    const errorClass =
        "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-500 focus:border-primary-600 block w-full p-2.5 dark:bg-[#2b2b2b] dark:border-red-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500";
    const regularClass =
        "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-[#2b2b2b] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
    return (
        <>
            <NavBar page="signup" />
            <div className="flex flex-col md:flex-row gap-8 md:gap-0">
                {/* <Features area="signup" /> */}
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
                                                userType === "brand"
                                                    ? "0%"
                                                    : "50%",
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

                                <form
                                    noValidate
                                    className="space-y-4 md:space-y-6"
                                    // onSubmit={formSubmission}
                                >
                                    <div className="flex gap-2">
                                        <div>
                                            <label
                                                htmlFor="profile"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                {valid.profile.message ? (
                                                    <span className="text-red-500">
                                                        {valid.profile.message}
                                                    </span>
                                                ) : (
                                                    userType == 'brand' ? "Brand's profile photo" : "Your profile photo"
                                                )}
                                            </label>
                                            <input
                                                name="profile"
                                                type="file"
                                                id="profile"
                                                // onChange={validate}
                                                className={
                                                    valid.profile.status
                                                        ? regularClass
                                                        : errorClass
                                                }
                                                accept="image/*"
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="name"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                {valid.name.message ? (
                                                    <span className="text-red-500">
                                                        {valid.name.message}
                                                    </span>
                                                ) : (
                                                    userType == 'brand' ? "Brand's name" : "Your name"
                                                )}
                                            </label>
                                            <input
                                                // onChange={validate}
                                                type="text"
                                                name="name"
                                                id="name"
                                                className={
                                                    valid.name.status
                                                        ? regularClass
                                                        : errorClass
                                                }
                                                placeholder="Alice"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            {valid.email.message ? (
                                                <span className="text-red-500">
                                                    {valid.email.message}
                                                </span>
                                            ) : (
                                                userType == 'brand' ? "Brand's email" : "Your email"
                                            )}
                                        </label>
                                        <input
                                            // onChange={validate}
                                            type="email"
                                            name="email"
                                            id="email"
                                            className={
                                                valid.email.status
                                                    ? regularClass
                                                    : errorClass
                                            }
                                            placeholder="example@company.com"
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <div>
                                            <label
                                                htmlFor="password1"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                {valid.password.message ? (
                                                    <span className="text-red-500">
                                                        {valid.password.message}
                                                    </span>
                                                ) : (
                                                    "Password"
                                                )}
                                            </label>
                                            <input
                                                // onChange={validate}
                                                type="password"
                                                name="password"
                                                id="password1"
                                                placeholder="&34@88$#!"
                                                className={
                                                    valid.password.status
                                                        ? regularClass
                                                        : errorClass
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="password2"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                {valid.confirmPassword
                                                    .message ? (
                                                    <span className="text-red-500">
                                                        {
                                                            valid
                                                                .confirmPassword
                                                                .message
                                                        }
                                                    </span>
                                                ) : (
                                                    "Confirm Password"
                                                )}
                                            </label>
                                            <input
                                                // onChange={validate}
                                                type="password"
                                                name="confirmPassword"
                                                placeholder="&34@88$#!"
                                                id="password2"
                                                className={
                                                    valid.confirmPassword.status
                                                        ? regularClass
                                                        : errorClass
                                                }
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full text-black bg-[#FFBF00] hover:bg-[#FFBF00] duration-200 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                    >
                                        Sign Up
                                    </button>
                                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                        Already have an account?{" "}
                                        <Link
                                            href="/login"
                                            className="font-medium text-black hover:underline dark:text-[#FFBF00] cursor-pointer"
                                        >
                                            Login
                                        </Link>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default SignUp;
