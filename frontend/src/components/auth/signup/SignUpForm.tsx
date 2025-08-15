"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { RoleType } from "@/types/auth/signup.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    SignupFormInput,
    signupSchema,
} from "@/libs/validations/signupFormData";
import UserTypeSelector from "./RoleSelector";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import Otp from "../Otp";
import { AnimatePresence, motion } from "framer-motion";
import { errorClass, regularClass } from "@/const/auth";
import { sendOtp } from "@/services";
import { addUser } from "@/redux/slices/auth.slice";

const SignUpForm = () => {
    const searchParams = useSearchParams();
    const typeParam = searchParams.get("type");
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useSelector((state: RootState) => state.auth);
    const [isFormFilled, setFormFilled] = useState(
        user?.username ? true : false
    );

    const isValidType = (type: string | null): type is RoleType =>
        type === "brand" || type === "creator";

    const [role, setRole] = useState<RoleType>(
        isValidType(typeParam) ? typeParam : "brand"
    );

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        clearErrors,
    } = useForm<SignupFormInput>({ resolver: zodResolver(signupSchema) });

    const onSubmit = async (formData: SignupFormInput) => {
        const data = await sendOtp({ email: formData.email });
        if (data.message == "success") {
            const user = { ...formData, role: role };
            delete user.confirmPassword;
            // temperorly add user
            dispatch(addUser({ user, token: null }));
            scrollRef.current?.scrollTo({
                left: scrollRef.current.scrollWidth,
                behavior: "smooth",
            });
            setFormFilled(() => true);
        }
    };

    useEffect(() => {
        clearErrors();
    }, [role]);

    return (
        <motion.div
            layout
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
                type: "spring",
                stiffness: 120,
                damping: 25,
            }}
            ref={scrollRef}
            className="sections w-full flex overflow-x-hidden"
        >
            <AnimatePresence>
                {!isFormFilled && (
                    <motion.div
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 120,
                            damping: 25,
                        }}
                        className="section min-w-full"
                    >
                        <h1 className="mb-8 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create your account
                        </h1>
                        {/* Role selector */}
                        <UserTypeSelector role={role} setRole={setRole} />
                        {/* Sign up form */}
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
                                    ) : role == "brand" ? (
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
                                        errors.username?.message
                                            ? errorClass
                                            : regularClass
                                    }
                                    placeholder={
                                        role === "brand" ? "Apple" : "Alice"
                                    }
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
                                    ) : role == "brand" ? (
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
                                        errors.email?.message
                                            ? errorClass
                                            : regularClass
                                    }
                                    placeholder="example@company.com"
                                />
                            </div>
                            <div className="flex gap-2 items-end w-full">
                                <div className="flex-1">
                                    <label
                                        htmlFor="password"
                                        className="w-full mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
                                            errors.password?.message
                                                ? errorClass
                                                : regularClass
                                        }
                                    />
                                </div>
                                <div className="flex-1">
                                    <label
                                        htmlFor="confirmPassword"
                                        className="w-full mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
                                className="w-full text-black bg-[#FFBF00] hover:bg-[#FFBF00] duration-200 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 cursor-pointer"
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
                    </motion.div>
                )}
            </AnimatePresence>
            {/* otp */}
            <Otp isFormFilled={isFormFilled} />
        </motion.div>
    );
};

export default SignUpForm;
