"use client";

import { FiSearch } from "react-icons/fi";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBar = () => {
    const pathnames = usePathname().split("/");
    const path = pathnames[pathnames.length - 1];

    return (
        <nav
            className={
                "bg-white dark:bg-[#1b1b1b]"
            }
        >
            <ul
                className={
                    "flex py-2 justify-between px-4"
                }
            >
                <li className="flex-1 font-bold my-1 text-lg md:text-2xl">
                    {" "}
                    <Link href="/">Logo</Link>{" "}
                </li>
                <li className="hidden md:flex flex-1 items-center px-4 gap-2 border border-[#868686] dark:border-gray-600 bg-gray-100 dark:bg-[#2b2b2b] rounded-xl">
                    <FiSearch />
                    <input
                        type="text"
                        className="w-full h-full outline-none"
                        placeholder="Search"
                    />
                </li>
                <li className="flex-1/3 lg:flex-1 flex text-sm items-center lg:text-base justify-end gap-6 my-1">
                    {!path ? (
                        <>
                            <Link href="/signin">Login</Link>{" "}
                            <Link href="/signup?type=brand">
                                <p>Join as Brand</p>
                            </Link>
                            <Link href="/signup?type=creator">
                                <p className="text-[#FFBF00]">
                                    Join as Creator
                                </p>
                            </Link>
                        </>
                    ) : path != "signin" ? (
                        <Link href="/signin">Login</Link>
                    ) : (
                        <>
                            <Link href="/signup?type=brand">
                                <p>Join as Brand</p>
                            </Link>
                            <Link href="/signup?type=creator">
                                <p className="text-[#FFBF00]">
                                    Join as Creator
                                </p>
                            </Link>
                        </>
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
