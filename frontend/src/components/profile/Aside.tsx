"use client";

import React from "react";
import { TbLogout } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";
import { PiUserCircleDashed } from "react-icons/pi";
import { LuSettings } from "react-icons/lu";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { logoutUser } from "@/redux/slices/auth.slice";
import { googleLogout } from "@react-oauth/google";

const Aside = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const params = usePathname();
    const { user } = useSelector((state: RootState) => state.auth);

    const handleLogout = () => {
        googleLogout()
        dispatch(logoutUser(router))
    };

    return (
        <div className="flex">
            <div className="bg-white dark:bg-[#1b1b1b] border-r border-gray-200 dark:border-none hidden md:flex flex-col">
                <ul className="p-4">
                    <li
                        onClick={() => {
                            router.push(`/${user?.username}`);
                        }}
                        className={
                            "hover:bg-slate-800 hover:text-white dark:hover:bg-[#101010] duration-200 px-4 py-2 rounded-2xl flex gap-3 items-center cursor-pointer " +
                            (params.endsWith(user?.username || "") &&
                                "bg-slate-900 dark:bg-[#0b0b0b] text-amber-400 dark:text-amber-300")
                        }
                    >
                        <FaRegUser />
                        Personal Details
                    </li>
                    <li
                        onClick={() => {
                            router.push(`/${user?.username}/accounts`);
                        }}
                        className={
                            "hover:bg-slate-800 hover:text-white dark:hover:bg-[#101010] duration-200 px-3.5 py-2 rounded-2xl flex gap-2 items-center cursor-pointer " +
                            (params.endsWith("accounts") &&
                                "bg-slate-900 dark:bg-[#0b0b0b] text-amber-400 dark:text-amber-300")
                        }
                    >
                        <PiUserCircleDashed size={21} />
                        Social Media Accounts
                    </li>
                </ul>
                <ul className="p-4">
                    <hr className="text-gray-300 dark:text-[#3b3b3b] mx-4 my-1" />
                    <li
                        onClick={() => {
                            router.push(`/${user?.username}/settings`);
                        }}
                        className={
                            "hover:bg-slate-800 hover:text-white dark:hover:bg-[#101010] duration-200 px-4 py-2 rounded-2xl flex gap-3 items-center cursor-pointer " +
                            (params.endsWith("settings") &&
                                "bg-slate-900 dark:bg-[#0b0b0b] text-amber-400 dark:text-amber-300")
                        }
                    >
                        <LuSettings />
                        Settings
                    </li>
                    <li
                        onClick={handleLogout}
                        className="text-red-400 hover:bg-red-100 hover:text-red-500 dark:hover:bg-[#101010] duration-200 px-4 py-2 rounded-2xl flex gap-3 items-center cursor-pointer"
                    >
                        <TbLogout />
                        Logout
                    </li>
                </ul>
            </div>
            <div className="flex-1">{children}</div>
        </div>
    );
};

export default Aside;
