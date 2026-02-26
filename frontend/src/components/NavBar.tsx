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
import { BsStars } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { LuSettings } from "react-icons/lu";
import { PiUserCircleDashed } from "react-icons/pi";
import { CgBookmark } from "react-icons/cg";
import { TbLogout } from "react-icons/tb";
import { HiOutlinePaintBrush } from "react-icons/hi2";

const NavBar = ({
    children: SearchComponents,
}: {
    children?: React.ReactNode;
}) => {
    const pathnames = usePathname().split("/");
    const path = pathnames[1];
    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const handleLogout = () => {
        googleLogout();
        dispatch(logoutUser(router));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
    };

    return (
        <nav className={"bg-white dark:bg-black"}>
            <ul
                className={
                    "flex py-3 justify-between items-center px-3 md:px-6 gap-4"
                }
            >
                <li className="flex-1 font-bold my-1 text-lg md:text-2xl">
                    <Link href="/">Collabify</Link>
                </li>
                {path && !SearchComponents && (
                    <ViewTransition name="search-bar">
                        <li
                            onClick={() => router.push("/search")}
                            className="hidden md:flex justify-between flex-1 items-center px-4 bg-gray-100 dark:bg-[#2b2b2b] rounded-2xl"
                        >
                            <form
                                onSubmit={handleSubmit}
                                autoComplete="off"
                                className="flex items-center gap-2"
                            >
                                <FiSearch />
                                <input
                                    type="search"
                                    name="search"
                                    className="w-full h-10 outline-none"
                                    placeholder="Search"
                                />
                            </form>
                            <BsStars className="text-lime-400" />
                        </li>
                    </ViewTransition>
                )}
                {SearchComponents && (
                    <li className="hidden md:block md:min-w-[75%] lg:min-w-[60%] xl:min-w-[50%]">
                        {SearchComponents}
                    </li>
                )}
                <li className="flex-1/3 md:flex-1 flex text-[0.7em] sm:text-xs md:text-base items-center justify-end gap-4 md:gap-6">
                    {user && user.isVerified ? (
                        path !== user.username && (
                            <DropdownMenu>
                                <DropdownMenuTrigger
                                    asChild
                                    className="border-none"
                                >
                                    <Image
                                        className={`w-9 rounded-full ${
                                            !user.profile
                                                ? "contrast-0 dark:contrast-100"
                                                : ""
                                        }`}
                                        width={20}
                                        height={20}
                                        src={
                                            user.profile
                                                ? `/api/image-proxy?url=${encodeURIComponent(user.profile)}`
                                                : "/images/icons/user.png"
                                        }
                                        alt={user.username}
                                    />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-60 mt-2"
                                    align="start"
                                >
                                    <DropdownMenuLabel>
                                        <Link href={`/${user.username}`}>
                                            <div className="flex flex-col items-center justify-center gap-2">
                                                <Image
                                                    className={`w-14 rounded-full ${
                                                        !user.profile
                                                            ? "contrast-0 dark:contrast-100"
                                                            : ""
                                                    }`}
                                                    width={40}
                                                    height={40}
                                                    src={
                                                        user.profile
                                                            ? `/api/image-proxy?url=${encodeURIComponent(user.profile)}`
                                                            : "/images/icons/user.png"
                                                    }
                                                    alt={user.username}
                                                />
                                                <h3 className="text-black dark:text-white text-[1.1em]">
                                                    {user.username}
                                                </h3>
                                            </div>
                                        </Link>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <Link href={`/${user.username}`}>
                                            <DropdownMenuItem>
                                                <FaRegUser />
                                                Profile
                                                <DropdownMenuShortcut>
                                                    ⇧⌘P
                                                </DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                        </Link>
                                        <Link
                                            href={`/${user.username}/accounts`}
                                        >
                                            <DropdownMenuItem>
                                                <PiUserCircleDashed size={17} />
                                                Social Accounts
                                                <DropdownMenuShortcut>
                                                    ⌘A
                                                </DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                        </Link>
                                        <Link
                                            href={`/${user.username}/saved-profiles`}
                                        >
                                            <DropdownMenuItem>
                                                <CgBookmark size={18} />
                                                Saved Profiles
                                                <DropdownMenuShortcut>
                                                    ⌘S
                                                </DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                        </Link>
                                        <Link
                                            href={`/${user.username}/settings#appearance`}
                                        >
                                            <DropdownMenuItem>
                                                <HiOutlinePaintBrush size={16} />
                                                Appearance
                                                <DropdownMenuShortcut>
                                                    ⌘T
                                                </DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                        </Link>
                                        <Link
                                            href={`/${user.username}/settings`}
                                        >
                                            <DropdownMenuItem>
                                                <LuSettings size={16} />
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
                                        <TbLogout size={17} />
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
                                <p className="text-lime-400">Join as Creator</p>
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
                                <p className="text-lime-400">Join as Creator</p>
                            </Link>
                        </>
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
