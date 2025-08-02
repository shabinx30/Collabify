import React, { FormEvent, useState } from "react";
import Link from "next/link";
import { UserType } from "@/types/auth/SignUpTypes";
import axios from "axios";

const SignUpForm = ({ userType }: { userType: UserType }) => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    })

    const [valid] = useState({
        profile: { status: true, message: "" },
        name: { status: true, message: "" },
        email: { status: true, message: "" },
        password: { status: true, message: "" },
        confirmPassword: { status: true, message: "" },
    });

    const errorClass =
        "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-500 focus:border-primary-600 block w-full p-2.5 dark:bg-[#2b2b2b] dark:border-red-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500";
    const regularClass =
        "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-[#2b2b2b] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

    const formSubmission = async (e: FormEvent) => {
        e.preventDefault()
        const res = await axios.post('http://localhost:3001/mone', formData)
        console.log(res)
    }

    return (
        <form
            noValidate
            className="space-y-4 md:space-y-6"
            onSubmit={formSubmission}
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
                        ) : userType == "brand" ? (
                            "Brand's profile photo"
                        ) : (
                            "Your profile photo"
                        )}
                    </label>
                    <input
                        name="profile"
                        type="file"
                        id="profile"
                        // onChange={validate}
                        className={
                            valid.profile.status ? regularClass : errorClass
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
                        ) : userType == "brand" ? (
                            "Brand name"
                        ) : (
                            "Your name"
                        )}
                    </label>
                    <input
                        onChange={(e) =>
                            setFormData((p) => ({
                                ...p,
                                [e.target.name]: e.target.value,
                            }))
                        }
                        type="text"
                        name="name"
                        id="name"
                        className={
                            valid.name.status ? regularClass : errorClass
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
                    ) : userType == "brand" ? (
                        "Brand's email"
                    ) : (
                        "Your email"
                    )}
                </label>
                <input
                    onChange={(e) =>
                            setFormData((p) => ({
                                ...p,
                                [e.target.name]: e.target.value,
                            }))
                        }
                    type="email"
                    name="email"
                    id="email"
                    className={valid.email.status ? regularClass : errorClass}
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
                        onChange={(e) =>
                            setFormData((p) => ({
                                ...p,
                                [e.target.name]: e.target.value,
                            }))
                        }
                        type="password"
                        name="password"
                        id="password1"
                        placeholder="&34@88$#!"
                        className={
                            valid.password.status ? regularClass : errorClass
                        }
                    />
                </div>
                <div>
                    <label
                        htmlFor="password2"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        {valid.confirmPassword.message ? (
                            <span className="text-red-500">
                                {valid.confirmPassword.message}
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
