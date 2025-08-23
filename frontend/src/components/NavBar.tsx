"use client";

import { FiSearch } from "react-icons/fi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const NavBar = () => {
    const pathnames = usePathname().split("/");
    const path = pathnames[0];
    const { user } = useSelector((state: RootState) => state.auth);

    return (
        <nav className={"bg-white dark:bg-[#1b1b1b]"}>
            <ul className={"flex py-2 justify-between items-center px-4"}>
                <li className="flex-1 font-bold my-1 text-lg md:text-2xl">
                    {" "}
                    <Link href="/">Logo</Link>{" "}
                </li>
                <li className="hidden md:flex flex-1 items-center px-4 gap-2 border border-[#868686] dark:border-gray-600 bg-gray-100 dark:bg-[#2b2b2b] rounded-xl">
                    <FiSearch />
                    <input
                        type="text"
                        className="w-full h-10 outline-none"
                        placeholder="Search"
                    />
                </li>
                <li className="flex-1/3 lg:flex-1 flex text-sm items-center lg:text-base justify-end gap-6">
                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div className="flex gap-4 items-center hover:bg-gray-200 dark:hover:bg-[#3b3b3b] duration-200 pl-4 rounded-full cursor-default">
                                    <h3>{user.username}</h3>
                                    <Image
                                        className="w-9 h-9 rounded-full"
                                        src={user.profile}
                                        alt="profile"
                                        width={100}
                                        height={100}
                                    />
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="center">
                                <DropdownMenuLabel>
                                    My Account
                                </DropdownMenuLabel>
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        Profile
                                        <DropdownMenuShortcut>
                                            ⇧⌘P
                                        </DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        Settings
                                        <DropdownMenuShortcut>
                                            ⌘S
                                        </DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <span className="text-red-500">Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : !path ? (
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
