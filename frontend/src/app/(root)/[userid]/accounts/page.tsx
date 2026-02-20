import AddButton from "@/components/auth/add-accounts/AddButton";
import { AiOutlineYoutube } from "react-icons/ai";
import { FaInstagram } from "react-icons/fa6";
import { IoInfinite } from "react-icons/io5";

const Accounts = () => {
    return (
        <main className="p-4">
            <section className="flex-col flex-1">
                <h3 className="font-semibold dark:text-base mb-1">Accounts</h3>
                <div className="w-full py-8 bg-gray-100 dark:bg-[#2b2b2b] rounded-2xl">
                    <header className="mb-6 text-center">
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                            Link Accounts
                        </h1>
                        <div className="mt-2 flex items-center justify-center gap-2.5 text-gray-700 dark:text-gray-200 mb-10">
                            <span className="font-medium">Collabify</span>
                            <IoInfinite
                                className="text-blue-400"
                                aria-hidden="true"
                                size={24}
                            />
                            <div className="flex items-center gap-0.5">
                                <FaInstagram />
                                <AiOutlineYoutube size={20} />
                            </div>
                        </div>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                            Link your social media accounts to gather real-time
                            insights and build trust with brands.
                        </p>
                    </header>

                    <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
                        <AddButton
                            href="/api/auth/instagram"
                            className="inline-flex items-center justify-center gap-2 rounded-full border border-lime-300 px-5 py-2.5 text-sm font-medium text-lime-400 hover:bg-lime-300 hover:text-black focus:outline-none focus:ring-2 focus:ring-lime-300/60 active:bg-lime-300/90 transition-colors cursor-pointer"
                        >
                            Instagram
                        </AddButton>

                        <AddButton className="inline-flex items-center justify-center gap-2 rounded-full border border-lime-300 px-5 py-2.5 text-sm font-medium text-lime-400 hover:bg-lime-300 hover:text-black focus:outline-none focus:ring-2 focus:ring-lime-300/60 active:bg-lime-300/90 transition-colors cursor-pointer">
                            YouTube
                        </AddButton>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Accounts;
