"use client";

import { errorClass, regularClass } from "@/const/auth";
import { signInSchema, TSignInForm } from "@/lib/validations/signinFromData";
import { signIn } from "@/redux/slices/auth.slice";
import { AppDispatch, RootState } from "@/redux/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import LoginWith from "../LoginWith";
import { useRouter } from "next/navigation";
import CardAnim from "../CardAnim";

const SignInForm = () => {
    const { isLoading } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TSignInForm>({ resolver: zodResolver(signInSchema) });

    const onSubmit = (formData: TSignInForm) => {
        dispatch(signIn({ formData, router }));
    };

    return (
        <CardAnim>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
            </h1>
            <form
                noValidate
                className="space-y-4 md:space-y-6 mt-8"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div>
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        {errors.email?.message ? (
                            <span className="text-red-500">
                                {errors.email.message}
                            </span>
                        ) : (
                            "Your email"
                        )}
                    </label>
                    <input
                        type="email"
                        id="email"
                        {...register("email")}
                        className={
                            errors.email?.message ? errorClass : regularClass
                        }
                        placeholder="example@company.com"
                    />
                </div>
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
                            "Your password"
                        )}
                    </label>
                    <input
                        type="password"
                        id="password"
                        {...register("password")}
                        placeholder="&34@88$#!"
                        className={
                            errors.password?.message ? errorClass : regularClass
                        }
                    />
                </div>
                <div className="flex flex-col gap-3 mt-[2.5em]">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full text-black bg-green-400 hover:bg-green-500 duration-200 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 cursor-pointer"
                    >
                        Sign In
                    </button>
                    <LoginWith />
                </div>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don’t have an account yet?{" "}
                    <Link
                        href="/signup"
                        className="font-medium text-black dark:text-green-400 hover:underline cursor-pointer"
                    >
                        Join
                    </Link>
                </p>
            </form>
        </CardAnim>
    );
};

export default SignInForm;
