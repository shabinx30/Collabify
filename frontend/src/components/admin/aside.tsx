"use client";

import React, { useEffect, useRef, useState } from "react";
import Navbar from "./navbar";
import { GoHomeFill } from "react-icons/go";
import { RiSettings3Fill } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { IoBusiness } from "react-icons/io5";
import { LuMicVocal } from "react-icons/lu";
import { usePathname, useRouter } from "next/navigation";

const Aside = ({ children }: { children: React.ReactNode }) => {
    const asideRef = useRef<HTMLDetailsElement>(null);
    const router = useRouter();
    const path = usePathname();

    const [asideWidth, setAsideWidth] = useState(0);

    useEffect(() => {
        if (asideRef.current) {
            setAsideWidth(asideRef.current.clientWidth);

            // Optional: listen for resize changes
            const resizeObserver = new ResizeObserver(() => {
                setAsideWidth(asideRef.current?.clientWidth || 0);
            });
            resizeObserver.observe(asideRef.current);

            return () => resizeObserver.disconnect();
        }
    }, [asideRef]);

    return (
        <>
            <div className="fixed flex p-3">
                <aside
                    ref={asideRef}
                    className="bg-white dark:bg-[#111C44] py-4 px-4 h-[calc(100vh-24px)] flex flex-col justify-between rounded-2xl"
                >
                    {/* upper menu */}
                    <div>
                        <h3 className="text-[1.75rem] text-center px-14 mt-4 mb-6 font-semibold">
                            Collabify
                        </h3>
                        <ul className="flex flex-col gap-1 text-[1.05rem]">
                            <li
                                onClick={() => router.push("/admin/dashboard")}
                                className={`flex gap-3 items-center hover:text-black dark:hover:text-white duration-150 px-4 py-2 rounded-2xl cursor-default 
                                ${
                                    path.endsWith("/dashboard")
                                        ? "text-black dark:text-white"
                                        : "text-[#9ab2d0]"
                                }
                            `}
                            >
                                <GoHomeFill
                                    size={20}
                                    className={` ${
                                        path.endsWith("/dashboard") &&
                                        "text-[#422AFB] dark:text-white"
                                    }`}
                                />
                                Dashboard
                            </li>
                            <li
                                onClick={() => router.push("/admin/creators")}
                                className={`flex gap-3 items-center hover:text-black dark:hover:text-white duration-150 px-4 py-2 rounded-2xl cursor-default 
                                ${
                                    path.endsWith("/creators")
                                        ? "text-black dark:text-white"
                                        : "text-[#9ab2d0]"
                                }
                            `}
                            >
                                <LuMicVocal
                                    size={20}
                                    className={` ${
                                        path.endsWith("/creators") &&
                                        "text-[#422AFB] dark:text-white"
                                    }`}
                                />
                                Creators
                            </li>
                            <li
                                onClick={() => router.push("/admin/brands")}
                                className={`flex gap-3 items-center hover:text-black dark:hover:text-white duration-150 px-4 py-2 rounded-2xl cursor-default 
                                ${
                                    path.endsWith("/brands")
                                        ? "text-black dark:text-white"
                                        : "text-[#9ab2d0]"
                                }
                            `}
                            >
                                <IoBusiness
                                    size={20}
                                    className={` ${
                                        path.endsWith("/brands") &&
                                        "text-[#422AFB] dark:text-white"
                                    }`}
                                />
                                Brands
                            </li>
                        </ul>
                    </div>
                    {/* lower menu */}
                    <div>
                        <ul className="flex flex-col text-[1.05rem]">
                            <li
                                onClick={() => router.push("/admin/settings")}
                                className="flex gap-3 items-center text-[#9ab2d0] dark:text-[#9ab2d0] hover:text-black dark:hover:text-white duration-150 px-4 py-2 rounded-2xl cursor-default"
                            >
                                <RiSettings3Fill
                                    size={20}
                                    className={` ${
                                        path.endsWith("/settings") &&
                                        "text-[#422AFB] dark:text-white"
                                    }`}
                                />
                                Settings
                            </li>
                            <li className="flex gap-3 items-center text-red-400 hover:text-red-500 dark:hover:text-red-500 duration-150 px-4 py-2 rounded-2xl cursor-default">
                                <FiLogOut size={20} />
                                Logout
                            </li>
                        </ul>
                    </div>
                </aside>
                <div className="flex-1 pl-6">
                    <Navbar asideWidth={asideWidth} />
                </div>
            </div>
            <section className="flex justify-end w-full">
                <div
                    style={{
                        width: `calc(100vw - ${asideWidth || 0}px - 37px)`,
                    }}
                    className="py-[7em] px-10"
                >
                    {children}
                </div>
            </section>
        </>
    );
};

export default Aside;
