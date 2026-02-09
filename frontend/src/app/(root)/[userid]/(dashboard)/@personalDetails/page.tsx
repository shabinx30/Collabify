"use client";

import Image from "next/image";
import { useUserData } from "@/contexts/UserDataContext";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { FiEdit3 } from "react-icons/fi";
import { RiTelegram2Line } from "react-icons/ri";

const PersonalDetails = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const { userData: profileUser } = useUserData();

    if (!profileUser) {
        return null;
    }
    return (
        <section className="flex-1 min-w-0">
            <h3 className="font-semibold dark:text-base mb-1">
                Person Details
            </h3>
            <section className="bg-gray-100 dark:bg-[#2b2b2b] flex flex-col h-full rounded-3xl p-2 sm:p-4">
                <div className="flex flex-col lg:flex-row gap-3">
                    <div className="relative max-h-fit shrink-0 self-center lg:self-start">
                        <Image
                            className={`min-w-44 rounded-2xl ${
                                !profileUser.profile
                                    ? "contrast-0 dark:contrast-100"
                                    : ""
                            }`}
                            width={100}
                            height={100}
                            src={
                                profileUser.profile || "/images/icons/user.png"
                            }
                            alt={profileUser.username}
                        />
                        <div className="absolute bottom-1 left-1 py-2 w-[calc(100%-8px)] bg-[#ffffff80] backdrop-blur-md rounded-full cursor-pointer">
                            <p className="text-center text-black text-xs">
                                change profile photo
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col w-full gap-6 lg:ml-4">
                        <div className="flex flex-col lg:flex-row lg:justify-between gap-3 lg:gap-0">
                            <div className="leading-tight flex-1 min-w-0">
                                <span className="text-gray-400 text-xs">
                                    Name
                                </span>
                                <h3 className="wrap-break-word">
                                    {profileUser.username}
                                </h3>
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <span className="text-gray-400 text-xs">
                                    Charge
                                </span>
                                {profileUser.amount ? (
                                    <h3>{profileUser.amount}$</h3>
                                ) : (
                                    <input
                                        type="number"
                                        className="custom-dotted-border rounded-xl p-1.5 outline-none focus:outline-lime-400 w-full lg:w-24 h-[2em] text-xs"
                                        placeholder="Eg:- 100$"
                                    />
                                )}
                            </div>
                        </div>
                        <div className="leading-tight min-w-0">
                            <span className="text-gray-400 text-xs">Email</span>
                            <h3 className="wrap-break-word break-all">
                                {profileUser.email}
                            </h3>
                        </div>
                        <div className="flex flex-col lg:flex-row lg:justify-between gap-3 lg:gap-0">
                            <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                                <span className="text-gray-400 text-xs">
                                    Tags
                                </span>
                                {profileUser.categories &&
                                profileUser.categories.length ? (
                                    <div className="flex gap-1 pt-0.5 flex-wrap">
                                        {profileUser.categories.map(
                                            (category, i) => (
                                                <p
                                                    key={i}
                                                    className="bg-lime-300 px-2 py-0.5 text-xs text-black rounded-full max-w-fit"
                                                >
                                                    {category}
                                                </p>
                                            ),
                                        )}
                                    </div>
                                ) : (
                                    <input
                                        type="text"
                                        className="custom-dotted-border rounded-xl p-1.5 outline-none focus:outline-lime-400 w-full h-[2em] text-xs max-w-full"
                                        placeholder="Eg:- Content Creator"
                                    />
                                )}
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <span className="text-gray-400 text-xs">
                                    Location
                                </span>
                                {profileUser.location ? (
                                    <h3 className="wrap-break-word">
                                        {profileUser.location}
                                    </h3>
                                ) : (
                                    <input
                                        type="text"
                                        className="custom-dotted-border rounded-xl p-1.5 outline-none focus:outline-lime-400 w-full lg:w-24 h-[2em] text-xs"
                                        placeholder="Eg:- Los Angeles, US"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-full flex items-end">
                    {user?.userId == profileUser._id ? (
                        <button className="flex items-center gap-2 justify-center text-lime-500 hover:bg-lime-400 hover:text-black hover:border-lime-400 duration-200 border-2 px-4 py-3 rounded-2xl w-full cursor-pointer">
                            <FiEdit3 size={20} />
                            Edit
                        </button>
                    ) : (
                        <button className="flex items-center gap-2 justify-center dark:text-black bg-lime-400 px-4 py-3 rounded-2xl w-full cursor-pointer">
                            <RiTelegram2Line size={20} />
                            Chat
                        </button>
                    )}
                </div>
            </section>
        </section>
    );
};

export default PersonalDetails;
