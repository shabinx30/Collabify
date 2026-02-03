"use client";

import { useState } from "react";
import { PiSlidersHorizontalBold } from "react-icons/pi";
import { IoChevronBackOutline } from "react-icons/io5";
import Link from "next/link";
import { motion } from "framer-motion";
import { IProfileUser } from "@/types/profile/profile.type";
import Tiles from "@/components/ui/Tiles";
import SearchBox from "@/components/search/SearchBox";
import { BsSortDown } from "react-icons/bs";

const layout = ({ children }: { children: React.ReactNode }) => {
    const [creators, setCreators] = useState<IProfileUser[]>([]);
    const [isSearched, setIsSearched] = useState<boolean>(false);

    return (
        <div className="py-2 md:py-12 px-4 gap-10 flex flex-col items-center">
            <div className="flex flex-col md:flex-row justify-center gap-2 w-full md:w-[75%] lg:w-[60%]">
                <motion.span
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ type: "tween" }}
                    className="hidden md:block"
                >
                    <Link
                        href="/"
                        className="flex h-full items-center px-3.5 border border-[#868686] dark:border-gray-600 bg-gray-100 dark:bg-[#2b2b2b] rounded-3xl cursor-pointer"
                    >
                        <IoChevronBackOutline size={20} />
                    </Link>
                </motion.span>
                <div className="flex md:hidden h-[2.5em] gap-1.5">
                    <motion.span
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ type: "tween" }}
                        className="flex flex-1/2 md:hidden"
                    >
                        <Link
                            href="/"
                            className="flex flex-1 h-full items-center justify-center px-3.5 border border-[#868686] dark:border-gray-600 bg-gray-100 dark:bg-[#2b2b2b] rounded-3xl cursor-pointer"
                        >
                            <IoChevronBackOutline size={20} />
                        </Link>
                    </motion.span>
                    <motion.span
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ type: "tween" }}
                        className="flex flex-1/2 md:hidden items-center justify-center px-3.5 border border-[#868686] dark:border-gray-600 bg-gray-100 dark:bg-[#2b2b2b] rounded-3xl cursor-pointer"
                    >
                        <PiSlidersHorizontalBold size={20} />
                    </motion.span>
                    <motion.span
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ type: "tween" }}
                        className="flex flex-1/2 md:hidden items-center justify-center px-3.5 border border-[#868686] dark:border-gray-600 bg-gray-100 dark:bg-[#2b2b2b] rounded-3xl cursor-pointer"
                    >
                        <BsSortDown size={20} />
                    </motion.span>
                </div>
                <SearchBox
                    setCreators={setCreators}
                    isSearched={isSearched}
                    setIsSearched={setIsSearched}
                />
                <motion.span
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ type: "tween" }}
                    className="hidden md:flex items-center px-3.5 border border-[#868686] dark:border-gray-600 bg-gray-100 dark:bg-[#2b2b2b] rounded-3xl cursor-pointer"
                >
                    <PiSlidersHorizontalBold size={20} />
                </motion.span>
                <motion.span
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ type: "tween" }}
                    className="hidden md:flex items-center px-3.5 border border-[#868686] dark:border-gray-600 bg-gray-100 dark:bg-[#2b2b2b] rounded-3xl cursor-pointer"
                >
                    <BsSortDown size={20} />
                </motion.span>
            </div>
            {!creators.length ? (
                <div>
                    {isSearched && (
                        <div className="flex items-center justify-center">
                            <p className="text-center">No creators found</p>
                        </div>
                    )}
                    {children}
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 py-[1em]">
                    {creators && creators.length ? (
                        creators.map((creator: IProfileUser, i: number) => (
                            <Tiles key={i} creator={creator} />
                        ))
                    ) : (
                        <p>No creators found</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default layout;
