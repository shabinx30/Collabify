"use client"

import { logoutUser } from "@/redux/slices/auth.slice";
import { AppDispatch } from "@/redux/store/store";
import { googleLogout } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { TbLogout } from "react-icons/tb";
import { useDispatch } from "react-redux";

const Logout = () => {
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()

    const handleLogout = () => {
        googleLogout();
        dispatch(logoutUser(router));
    };

    return (
        <section className="flex justify-center my-8">
            <div onClick={handleLogout} className="flex gap-1 items-center md:hidden text-red-400 bg-gray-100 dark:bg-black rounded-2xl px-4 pt-1.5 py-2 cursor-pointer">
                <TbLogout size={18} />
                <p>Logout</p>
            </div>
        </section>
    );
};

export default Logout;
