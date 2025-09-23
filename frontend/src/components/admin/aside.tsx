import React from "react";
import Navbar from "./navbar";
import { GoHomeFill } from "react-icons/go";
import { RiSettings3Fill } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { IoBusiness } from "react-icons/io5";
import { LuMicVocal } from "react-icons/lu";

const Aside = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex p-3 bg-[#f0f5ff] dark:bg-[#211329]">
            <aside className="bg-white dark:bg-[#2b2b2b] py-4 px-4 h-[calc(100vh-24px)] flex flex-col justify-between rounded-2xl">
                {/* upper menu */}
                <div>
                    <h3 className="text-[1.75rem] text-center px-14 mt-4 mb-6 font-semibold">
                        Collabify
                    </h3>
                    <ul className="flex flex-col gap-1 text-[1.05rem]">
                        <li className="flex gap-3 items-center dark:text-[#9ab2d0] hover:text-black dark:hover:text-white text-black duration-150 px-4 py-2 rounded-2xl">
                            <GoHomeFill
                                size={20}
                                className="text-[#422AFB] hover:text-[#422AFB]"
                            />
                            Dashboard
                        </li>
                        <li className="flex gap-3 items-center text-[#9ab2d0] dark:text-[#9ab2d0] hover:text-black dark:hover:text-white duration-150 px-4 py-2 rounded-2xl">
                            <LuMicVocal size={20} />
                            Creators
                        </li>
                        <li className="flex gap-3 items-center text-[#9ab2d0] dark:text-[#9ab2d0] hover:text-black dark:hover:text-white duration-150 px-4 py-2 rounded-2xl">
                            <IoBusiness size={20} />
                            Brands
                        </li>
                    </ul>
                </div>
                {/* lower menu */}
                <div>
                    <ul className="flex flex-col text-[1.05rem]">
                        <li className="flex gap-3 items-center text-[#9ab2d0] dark:text-[#9ab2d0] hover:text-black dark:hover:text-white duration-150 px-4 py-2 rounded-2xl">
                            <RiSettings3Fill size={20} />
                            Settings
                        </li>
                        <li className="flex gap-3 items-center text-red-400 hover:text-black dark:hover:text-white duration-150 px-4 py-2 rounded-2xl">
                            <FiLogOut size={20} />
                            Logout
                        </li>
                    </ul>
                </div>
            </aside>
            <div className="flex-1 pl-4">
                <Navbar />
                {children}
            </div>
        </div>
    );
};

export default Aside;
