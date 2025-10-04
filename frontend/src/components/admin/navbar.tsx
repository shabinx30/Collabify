"use client";
import React, { useMemo } from "react";
import { FiSearch } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { IoMoon } from "react-icons/io5";
import { usePathname } from "next/navigation";

const Navbar = ({ asideWidth }: { asideWidth: number }) => {
    const pathname = usePathname();

    const currentPath = useMemo(() => {
        const parts = pathname.split("/").filter(Boolean);
        const last = parts[parts.length - 1] || "Home";
        return last.charAt(0).toUpperCase() + last.slice(1);
    }, [pathname]);

    return (
        <nav
            className="flex justify-between backdrop-blur-md bg-[#00000016] dark:bg-[#ffffff16] rounded-full z-[50] fixed p-2"
            style={{
                width: `calc(100vw - ${asideWidth || 0}px - 67px)`,
                // borderTopLeftRadius: 46,
                // borderBottomLeftRadius: 46,
                // borderTopRightRadius: 100,
                // borderBottomRightRadius: 100,
            }}
        >
            {/* current page */}
            <div className="flex items-center pl-4">
                <span className="text-xl font-semibold">{currentPath}</span>
            </div>

            <div className="bg-white dark:bg-[#111C44] rounded-full flex gap-2 p-2">
                {/* Search box */}
                <div className="bg-[#eae7ff] dark:bg-[#0B1437] px-3.5 py-1 rounded-full flex items-center gap-1 flex-1">
                    <FiSearch />
                    <input
                        type="text"
                        className="rounded-2xl p-1 w-full bg-transparent outline-none dark:placeholder:text-white placeholder:text-[#9ab2d0]"
                        placeholder="Search..."
                        name="search"
                    />
                </div>

                {/* Theme toggle */}
                <button
                    className="h-full flex items-center rounded-full p-3 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                    aria-label="Toggle theme"
                >
                    <IoMoon />
                </button>

                {/* User icon */}
                <span className="bg-[#eae7ff] dark:bg-[#0B1437] h-full flex items-center rounded-full p-3">
                    <FaRegUser />
                </span>
            </div>
        </nav>
    );
};

export default Navbar;
