"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { UserType } from "@/types/auth/SignUpTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    SignupFormInput,
    signupSchema,
} from "@/libs/validations/signupFormData";
import axios from "axios";

const SignUpForm = ({ userType }: { userType: UserType }) => {
    const errorClass =
        "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-500 focus:border-primary-600 block w-full p-2.5 dark:bg-[#2b2b2b] dark:border-red-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500";
    const regularClass =
        "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-[#2b2b2b] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        clearErrors,
    } = useForm<SignupFormInput>({ resolver: zodResolver(signupSchema) });

    const onSubmit = async (data: SignupFormInput) => {
        console.log(process.env.API_URL);
        // const res = await axios.post(`${process.env.API_URL}`)
    };

    useEffect(() => {
        clearErrors();
    }, [userType]);

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 md:space-y-6"
        >
            <div>
                <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    {errors.username?.message ? (
                        <span className="text-red-500">
                            {errors.username?.message}
                        </span>
                    ) : userType == "brand" ? (
                        "Brand name"
                    ) : (
                        "Your name"
                    )}
                </label>
                <input
                    {...register("username")}
                    type="text"
                    name="username"
                    id="username"
                    className={
                        errors.username?.message ? errorClass : regularClass
                    }
                    placeholder="Alice"
                />
            </div>
            <div>
                <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    {errors.email?.message ? (
                        <span className="text-red-500">
                            {errors.email?.message}
                        </span>
                    ) : userType == "brand" ? (
                        "Brand's email"
                    ) : (
                        "Your email"
                    )}
                </label>
                <input
                    {...register("email")}
                    type="email"
                    name="email"
                    id="email"
                    className={
                        errors.email?.message ? errorClass : regularClass
                    }
                    placeholder="example@company.com"
                />
            </div>
            <div className="flex gap-2 items-end">
                <div>
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        {errors.password?.message ? (
                            <span className="text-red-500">
                                {errors.password.message}
                            </span>
                        ) : (
                            "Password"
                        )}
                    </label>
                    <input
                        {...register("password")}
                        type="password"
                        name="password"
                        id="password"
                        placeholder="&34@88$#!"
                        className={
                            errors.password?.message ? errorClass : regularClass
                        }
                    />
                </div>
                <div>
                    <label
                        htmlFor="confirmPassword"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        {errors.confirmPassword?.message ? (
                            <span className="text-red-500">
                                {errors.confirmPassword.message}
                            </span>
                        ) : (
                            "Confirm Password"
                        )}
                    </label>
                    <input
                        {...register("confirmPassword")}
                        type="password"
                        name="confirmPassword"
                        placeholder="&34@88$#!"
                        id="confirmPassword"
                        className={
                            errors.confirmPassword?.message
                                ? errorClass
                                : regularClass
                        }
                    />
                </div>
            </div>
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full text-black bg-[#FFBF00] hover:bg-[#FFBF00] duration-200 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
                Sign Up
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                    href="/signin"
                    className="font-medium text-black hover:underline dark:text-[#FFBF00] cursor-pointer"
                >
                    Login
                </Link>
            </p>
        </form>
    );
};

export default SignUpForm;
