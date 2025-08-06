"use client";

import Link from "next/link";
import React, { useState } from "react";

const SignInForm = () => {
    const [valid] = useState({
        email: { status: true, message: "" },
        password: { status: true, message: "" },
    });

    const errorClass =
        "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-500 focus:border-primary-600 block w-full p-2.5 dark:bg-[#2b2b2b] dark:border-red-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500";
    const regularClass =
        "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-[#2b2b2b] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

    return (
        <>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
            </h1>
            <form
                noValidate
                className="space-y-4 md:space-y-6"
                // onSubmit={formSubmission}
            >
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
                            "Your email"
                        )}
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        // onChange={validate}
                        className={
                            valid.email.status ? regularClass : errorClass
                        }
                        placeholder="example@company.com"
                    />
                </div>
                <div>
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        {valid.password.message ? (
                            <span className="text-red-500">
                                {valid.password.message}
                            </span>
                        ) : (
                            "Your password"
                        )}
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        // onChange={validate}
                        placeholder="&34@88$#!"
                        className={
                            valid.password.status ? regularClass : errorClass
                        }
                    />
                </div>
                <button
                    type="submit"
                    className="w-full text-black bg-[#FFBF00] hover:bg-[#FFBF00] duration-200 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                    Sign In
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don’t have an account yet?{" "}
                    <Link
                        href="/signup"
                        className="font-medium text-black dark:text-[#FFBF00] hover:underline cursor-pointer"
                    >
                        Join
                    </Link>
                </p>
            </form>
        </>
    );
};

export default SignInForm;
