import SignInForm from "@/components/auth/SignInForm";

const SignIn = () => {

    return (
        <main className="flex flex-col md:flex-row gap-8 md:gap-0">
            <section className="bg-gray-50 flex-1/4 dark:bg-black">
                <div className="flex flex-col items-center justify-center h-screen px-6 mx-auto">
                    <div className="w-full bg-white rounded-3xl shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-[#1b1b1b] dark:border-[#2b2b2b]">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            {/* sign in form */}
                            <SignInForm />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default SignIn;
