"use client";

import React from "react";
import { TbLogout } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";
import { PiUserCircleDashed } from "react-icons/pi";
import { LuSettings } from "react-icons/lu";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

const Aside = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const params = usePathname();
    const { user } = useSelector((state: RootState) => state.auth);

    return (
        <div className="flex">
            <div className="bg-[#1b1b1b] flex flex-col">
                <ul className="p-4">
                    <li
                        onClick={() => {
                            router.push(`/${user?.username}`);
                        }}
                        className={
                            "hover:bg-[#101010] duration-200 px-4 py-2 rounded-2xl flex gap-3 items-center cursor-default" +
                            (params.endsWith(user?.username || "") &&
                                " bg-[#0b0b0b] text-amber-300")
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
                            "hover:bg-[#101010] duration-200 px-3.5 py-2 rounded-2xl flex gap-2 items-center cursor-default" +
                            (params.endsWith("/accounts") &&
                                " bg-[#0b0b0b] text-amber-300")
                        }
                    >
                        <PiUserCircleDashed size={21} />
                        Social Media Accounts
                    </li>
                </ul>
                <ul className="p-4">
                    <hr className="text-[#3b3b3b] mx-4 my-1" />
                    <li
                        onClick={() => {
                            router.push(`/${user?.username}/settings`);
                        }}
                        className={
                            "hover:bg-[#101010] duration-200 px-4 py-2 rounded-2xl flex gap-3 items-center cursor-default" +
                            (params.endsWith("settings") &&
                                " bg-[#0b0b0b] text-amber-300")
                        }
                    >
                        <LuSettings />
                        Settings
                    </li>
                    <li className="text-red-400 hover:bg-[#101010] duration-200 px-4 py-2 rounded-2xl flex gap-3 items-center cursor-default">
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
