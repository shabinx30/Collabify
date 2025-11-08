"use client";

import Featured from "@/components/home/Featured";
import { useEffect, useRef } from "react";
import { ViewTransition } from "react";
import { FiSearch } from "react-icons/fi";
import { PiSlidersHorizontalBold } from "react-icons/pi";
import { IoChevronBackOutline } from "react-icons/io5";
import Link from "next/link";
import { motion } from "framer-motion";

const Search = () => {
    const searchRef = useRef<HTMLInputElement>(null);

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
                        className="flex h-full items-center px-3.5 border border-[#868686] dark:border-gray-600 bg-gray-100 dark:bg-[#2b2b2b] rounded-2xl cursor-pointer"
                    >
                        <IoChevronBackOutline size={20} />
                    </Link>
                </motion.span>
                <ViewTransition name="search-bar">
                    <div className="w-1/2 flex items-center px-5 gap-3 border border-[#868686] dark:border-gray-600 bg-gray-100 dark:bg-[#2b2b2b] rounded-2xl">
                        <FiSearch size={18} />
                        <input
                            ref={searchRef}
                            type="text"
                            className="w-full h-12 outline-none text-lg"
                            placeholder="Search"
                        />
                    </div>
                </ViewTransition>
                <motion.span
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ type: "tween" }}
                    className="flex items-center px-3.5 border border-[#868686] dark:border-gray-600 bg-gray-100 dark:bg-[#2b2b2b] rounded-2xl cursor-pointer"
                >
                    <PiSlidersHorizontalBold size={20} />
                </motion.span>
            </div>
            <div>
                <Featured/>
            </div>
        </div>
    );
};

export default Search;
