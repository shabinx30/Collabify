"use client";

import { useEffect, useRef } from "react";
import { ViewTransition } from "react";
import { FiSearch } from "react-icons/fi";
import { PiSlidersHorizontalBold } from "react-icons/pi";
import { IoChevronBackOutline } from "react-icons/io5";
import Link from "next/link";
import { motion } from "framer-motion";
import { BsStars } from "react-icons/bs";

const layout = ({ children }: { children: React.ReactNode }) => {
    const searchRef = useRef<HTMLInputElement>(null);

    const searchPlaceholders = [
        "Who are the top tech creators in India?",
        "Fashion creators in India with 4-star ratings",
        "Find beauty influencers on Instagram",
        "Best tech creators on YouTube",
    ];

    useEffect(() => {
        if (searchRef.current) {
            searchRef.current.focus();
        }
    }, []);

    return (
        <div className="py-12 gap-10 flex flex-col items-center">
            <div className="flex justify-center gap-2 w-1/2">
                <motion.span
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ type: "tween" }}
                >
                    <Link
                        href="/"
                        className="flex h-full items-center px-3.5 border border-[#868686] dark:border-gray-600 bg-gray-100 dark:bg-[#2b2b2b] rounded-3xl cursor-pointer"
                    >
                        <IoChevronBackOutline size={20} />
                    </Link>
                </motion.span>
                <ViewTransition name="search-bar">
                    <div className="flex w-full md:w-[75%] lg:w-[60%] justify-between items-center px-3 md:px-6 py-2 md:py-4 border border-[#868686] dark:border-gray-600 bg-gray-100 dark:bg-[#2b2b2b] rounded-3xl">
                        <div className="flex items-center gap-1.5 md:gap-3 w-full">
                            <FiSearch size={18} />
                            <form
                                autoComplete="off"
                                className="relative w-full overflow-hidden search-container text-sm md:text-base"
                            >
                                <input
                                    type="search"
                                    name="search"
                                    className="relative w-full outline-none bg-transparent z-2"
                                    placeholder="Try"
                                />
                                <div className="placeholder-scroll">
                                    {searchPlaceholders.map((val, i) => (
                                        <div
                                            key={i}
                                            className="placeholder-item"
                                        >
                                            {`"${val}"`}
                                        </div>
                                    ))}
                                </div>
                            </form>
                        </div>
                        <BsStars size={20} className="text-green-400" />
                    </div>
                </ViewTransition>
                <motion.span
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ type: "tween" }}
                    className="flex items-center px-3.5 border border-[#868686] dark:border-gray-600 bg-gray-100 dark:bg-[#2b2b2b] rounded-3xl cursor-pointer"
                >
                    <PiSlidersHorizontalBold size={20} />
                </motion.span>
            </div>
            <div>{children}</div>
        </div>
    );
};

export default layout;
