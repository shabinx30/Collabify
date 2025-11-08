import { IoInfinite } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa6";
import { AiOutlineYoutube } from "react-icons/ai";
import CardAnim from "@/components/auth/CardAnim";
import AddButton from "@/components/auth/add-account/AddButton";

export default function AddAccountsPage() {
    return (
        <CardAnim className="w-full">
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
                    Link your social media accounts to gather real-time insights
                    and build trust with brands.
                </p>
            </header>

            <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
                <AddButton
                    href="/api/auth/instagram"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-amber-300 px-5 py-2.5 text-sm font-medium text-amber-400 hover:bg-amber-300 hover:text-black focus:outline-none focus:ring-2 focus:ring-amber-300/60 active:bg-amber-300/90 transition-colors cursor-pointer"
                >
                    Instagram
                </AddButton>

                <AddButton className="inline-flex items-center justify-center gap-2 rounded-full border border-amber-300 px-5 py-2.5 text-sm font-medium text-amber-400 hover:bg-amber-300 hover:text-black focus:outline-none focus:ring-2 focus:ring-amber-300/60 active:bg-amber-300/90 transition-colors cursor-pointer">
                    YouTube
                </AddButton>
            </div>
        </CardAnim>
    );
}
