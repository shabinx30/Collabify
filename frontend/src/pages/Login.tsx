import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <>
            <NavBar page="login" />
            <main className="flex flex-col md:flex-row gap-8 md:gap-0">
                {/* <Features page={"login"} /> */}
                <section className="bg-gray-50 flex-1/4 dark:bg-black pt-14 md:pt-0">
                    <div className="flex flex-col items-center justify-center md:h-screen px-6 py-8 mx-auto lg:py-0">
                        <div className="w-full bg-white rounded-3xl shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-[#1b1b1b] dark:border-[#2b2b2b]">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
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
                                            {/* {valid.email.message ? (
                                                <span className="text-red-500">
                                                    {valid.email.message}
                                                </span>
                                            ) : (
                                                "Your email"
                                            )} */}
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            // onChange={validate}
                                            // className={
                                            //     valid.email.status
                                            //         ? regularClass
                                            //         : errorClass
                                            // }
                                            placeholder="example@company.com"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="password"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            {/* {valid.password.message ? (
                                                <span className="text-red-500">
                                                    {valid.password.message}
                                                </span>
                                            ) : (
                                                "Your password"
                                            )} */}
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            // onChange={validate}
                                            // placeholder="&34@88$#!"
                                            // className={
                                            //     valid.password.status
                                            //         ? regularClass
                                            //         : errorClass
                                            // }
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full text-black bg-[#b0ff62] hover:bg-[#b0ff62] duration-200 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                    >
                                        Sign In
                                    </button>
                                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                        Don’t have an account yet?{" "}
                                        <Link
                                            to="/signup"
                                            className="font-medium text-black dark:text-[#b0ff62] hover:underline cursor-pointer"
                                        >
                                            Sign up
                                        </Link>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
};

export default Login;
