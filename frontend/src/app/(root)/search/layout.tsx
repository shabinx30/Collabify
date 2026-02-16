"use client";

import { useState } from "react";
import Link from "next/link";
import { IProfileUser } from "@/types/profile/profile.type";
import Tiles from "@/components/ui/Tiles";
import NavBar from "@/components/NavBar";
import { motion } from "framer-motion";
import { PiSlidersHorizontalBold } from "react-icons/pi";
import { BsSortDown } from "react-icons/bs";
import SearchBox from "@/components/search/SearchBox";

const layout = ({ children }: { children: React.ReactNode }) => {
    const [creators, setCreators] = useState<IProfileUser[]>([]);
    const [isSearched, setIsSearched] = useState<boolean>(false);

    return (
        <>
            <NavBar>
                <div className="flex flex-col md:flex-row justify-center gap-2">
                    <SearchBox
                        setCreators={setCreators}
                        isSearched={isSearched}
                        setIsSearched={setIsSearched}
                        isInSearchPage={true}
                        wrapInView={true}
                    />
                    <motion.span
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ type: "tween" }}
                        className="hidden lg:flex items-center px-3.5 bg-gray-100 dark:bg-[#2b2b2b] rounded-3xl cursor-pointer"
                    >
                        <PiSlidersHorizontalBold size={20} />
                    </motion.span>
                    <motion.span
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ type: "tween" }}
                        className="hidden lg:flex items-center px-3.5 bg-gray-100 dark:bg-[#2b2b2b] rounded-3xl cursor-pointer"
                    >
                        <BsSortDown size={20} />
                    </motion.span>
                </div>
            </NavBar>
            <main className="py-4 md:py-5 items-center px-4 md:px-[8.25%] lg:px-[10%]">
                <div className="flex flex-col md:flex-row lg:hidden justify-center gap-2 w-full mb-6">
                    <div className="md:hidden">
                        <SearchBox
                            setCreators={setCreators}
                            isSearched={isSearched}
                            setIsSearched={setIsSearched}
                            wrapInView={false}
                        />
                    </div>
                    <div className="flex lg:hidden h-[2.5em] gap-1.5">
                        <motion.span
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ type: "tween" }}
                            className="flex flex-1/2 md:hidden items-center justify-center px-3.5 bg-gray-100 dark:bg-[#2b2b2b] rounded-3xl cursor-pointer"
                        >
                            <PiSlidersHorizontalBold size={20} />
                        </motion.span>
                        <motion.span
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ type: "tween" }}
                            className="flex flex-1/2 md:hidden items-center justify-center px-3.5 bg-gray-100 dark:bg-[#2b2b2b] rounded-3xl cursor-pointer"
                        >
                            <BsSortDown size={20} />
                        </motion.span>
                    </div>
                    <motion.span
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ type: "tween" }}
                        className="hidden md:flex items-center px-3.5 bg-gray-100 dark:bg-[#2b2b2b] rounded-3xl cursor-pointer"
                    >
                        <PiSlidersHorizontalBold size={20} />
                    </motion.span>
                    <motion.span
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ type: "tween" }}
                        className="hidden md:flex items-center px-3.5 bg-gray-100 dark:bg-[#2b2b2b] rounded-3xl cursor-pointer"
                    >
                        <BsSortDown size={20} />
                    </motion.span>
                </div>
                {!creators.length ? (
                    <>
                        {isSearched && (
                            <div className="flex items-center justify-center">
                                <p className="text-center">No creators found</p>
                            </div>
                        )}
                        {children}
                    </>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 py-[1em]">
                        {creators && creators.length ? (
                            creators.map((creator: IProfileUser, i: number) => (
                                <Link href={`/${creator.username}`} key={i}>
                                    <Tiles creator={creator} wrapInView={true} key={i} />
                                </Link>
                            ))
                        ) : (
                            <p>No creators found</p>
                        )}
                    </div>
                )}
            </main>
        </>
    );
};

export default layout;
