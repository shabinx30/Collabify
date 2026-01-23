"use client";

import { useEffect, useRef, ViewTransition, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { PiSlidersHorizontalBold } from "react-icons/pi";
import { IoChevronBackOutline } from "react-icons/io5";
import Link from "next/link";
import { motion } from "framer-motion";
import { BsStars } from "react-icons/bs";
import { searchCreators } from "@/services";
import { IProfileUser } from "@/types/profile/profile.type";
import Tiles from "@/components/ui/Tiles";

const layout = ({ children }: { children: React.ReactNode }) => {
    const searchRef = useRef<HTMLInputElement>(null);
    const [search, setSearch] = useState("");
    const [creators, setCreators] = useState([]);

    const searchPlaceholders = [
        "Who are the top tech creators in India?",
        "Fashion creators in India with 4-star ratings",
        "Find beauty influencers on Instagram",
        "Best tech creators on YouTube",
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!search || !search.trim()) return;
        const res = await searchCreators(search);
        console.log(res)
        setCreators(() => res);
    };

    useEffect(() => {
        if (searchRef.current) {
            searchRef.current.focus();
        }
    }, []);

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
                </div>
                <ViewTransition name="search-bar">
                    <div className="flex w-full md:w-[75%] lg:w-[60%] justify-between items-center px-3 md:px-6 py-2.5 md:py-4 border border-[#868686] dark:border-gray-600 bg-gray-100 dark:bg-[#2b2b2b] rounded-3xl">
                        <div className="flex items-center gap-1.5 md:gap-3 w-full">
                            <FiSearch size={18} />
                            <form
                                autoComplete="off"
                                onSubmit={handleSubmit}
                                className="relative w-full overflow-hidden search-container text-xs md:text-base"
                            >
                                <input
                                    type="search"
                                    name="search"
                                    onChange={handleChange}
                                    className="relative w-full outline-none bg-transparent z-2"
                                    placeholder="Try"
                                />
                                <div className="placeholder-scroll left-[22px] md:left-[30px]">
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
                    className="hidden md:flex items-center px-3.5 border border-[#868686] dark:border-gray-600 bg-gray-100 dark:bg-[#2b2b2b] rounded-3xl cursor-pointer"
                >
                    <PiSlidersHorizontalBold size={20} />
                </motion.span>
            </div>
            {!creators.length ? (
                <div>{children}</div>
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
