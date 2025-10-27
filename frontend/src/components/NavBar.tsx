"use client";

import { FiSearch } from "react-icons/fi";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
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
import { logoutUser } from "@/redux/slices/auth.slice";
import { FormEvent, ViewTransition } from "react";
import { googleLogout } from "@react-oauth/google";

const NavBar = () => {
    const pathnames = usePathname().split("/");
    const path = pathnames[1];
    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const handleLogout = () => {
        googleLogout()
        dispatch(logoutUser(router))
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
    };

    return (
        <nav className={"bg-white dark:bg-[#1b1b1b]"}>
            <ul className={"flex py-2 justify-between items-center px-4"}>
                <li className="flex-1 font-bold my-1 text-base md:text-xl">
                    {" "}
                    <Link href="/">Collabify</Link>{" "}
                </li>
                <ViewTransition name="search-bar">
                    <li
                        onClick={() => router.push("/search")}
                        className="hidden md:flex flex-1 items-center px-4 gap-2 border border-[#868686] dark:border-gray-600 bg-gray-100 dark:bg-[#2b2b2b] rounded-xl"
                    >
                        <FiSearch />
                        <form onSubmit={handleSubmit} autoComplete="off">
                            <input
                                type="search"
                                name="search"
                                className="w-full h-10 outline-none"
                                placeholder="Search"
                            />
                        </form>
                    </li>
                </ViewTransition>
                <li className="flex-1/3 lg:flex-1 flex text-sm items-center justify-end gap-6">
                    {user ? (
                        path !== user.username && (
                            <DropdownMenu>
                                <DropdownMenuTrigger
                                    asChild
                                    className="border-none"
                                >
                                    <div className="flex gap-4 items-center hover:bg-gray-200 dark:hover:bg-[#3b3b3b] duration-200 pl-4 rounded-full cursor-default">
                                        <h3>{user.username}</h3>
                                        <ViewTransition name="profile">
                                            <Image
                                                className={`w-9 h-9 rounded-full ${
                                                    !user.profile
                                                        ? "contrast-0 dark:contrast-100"
                                                        : ""
                                                }`}
                                                width={100}
                                                height={100}
                                                src={
                                                    user.profile ||
                                                    "/images/icons/user.png"
                                                }
                                                alt={user.username}
                                            />
                                        </ViewTransition>
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-56"
                                    align="center"
                                >
                                    <DropdownMenuLabel>
                                        My Account
                                    </DropdownMenuLabel>
                                    <DropdownMenuGroup>
                                        <Link href={`/${user.username}`}>
                                            <DropdownMenuItem>
                                                Profile
                                                <DropdownMenuShortcut>
                                                    ⇧⌘P
                                                </DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                        </Link>
                                        <Link
                                            href={`/${user.username}/settings`}
                                        >
                                            <DropdownMenuItem>
                                                Settings
                                                <DropdownMenuShortcut>
                                                    ⌘S
                                                </DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                        </Link>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        onClick={handleLogout}
                                        onMouseEnter={(e) =>
                                            (e.currentTarget.style.color =
                                                "#fb2c36")
                                        }
                                        className="text-red-500"
                                    >
                                        Log out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )
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
