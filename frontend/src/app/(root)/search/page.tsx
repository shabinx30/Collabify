"use client"

import React, { useEffect, useRef } from "react";
import { unstable_ViewTransition as ViewTransition } from "react";
import { FiSearch } from "react-icons/fi";

const page = () => {
    const searchRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if(searchRef.current) {
            searchRef.current.focus()
        }
    },[])

    return (
        <div className="pt-[10em] flex justify-center">
            <ViewTransition name="search-bar">
                <li className="hidden md:flex w-1/2 items-center px-4 gap-2 border border-[#868686] dark:border-gray-600 bg-gray-100 dark:bg-[#2b2b2b] rounded-xl">
                    <FiSearch />
                    <input
                        ref={searchRef}
                        type="text"
                        className="w-full h-10 outline-none"
                        placeholder="Search"
                    />
                </li>
            </ViewTransition>
        </div>
    );
};

export default page;
