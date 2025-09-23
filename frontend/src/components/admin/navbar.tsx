import React from "react";
import { FiSearch } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { IoMoon } from "react-icons/io5";

const Navbar = () => {
    return (
        <nav className="flex justify-end">
            <div className="bg-white dark:bg-[#2b2b2b] rounded-full flex gap-2 p-2">
                <div className="bg-[#eae7ff] dark:bg-[#3b3b3b] px-3.5 py-1 rounded-full flex gap-1 items-center flex-1">
                    <FiSearch />
                    <input
                        type="text"
                        className="rounded-2xl p-1 w-full"
                        placeholder="Search"
                    />
                </div>
                <span className="h-full flex items-center rounded-full p-3">
                    <IoMoon />
                </span>
                <span className="bg-[#eae7ff] dark:bg-[#3b3b3b] h-full flex items-center rounded-full p-3">
                    <FaRegUser />
                </span>
            </div>
        </nav>
    );
};

export default Navbar;
