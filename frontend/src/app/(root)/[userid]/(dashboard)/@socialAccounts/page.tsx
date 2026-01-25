"use client";

import ProfileTabs from "@/components/profile/socialAccounts/Tabs";
import Posts from "@/components/profile/socialAccounts/Posts";
import { RootState } from "@/redux/store/store";
import Image from "next/image";
import Link from "next/link";
import { RiLinkM } from "react-icons/ri";
import { useSelector } from "react-redux";
import { getSocialAccount } from "@/services";
import { useEffect, useState } from "react";
import { Social } from "@/types/profile/social.type";

// Reusable component for profile stats
const ProfileStat = ({
    label,
    value,
}: {
    label: string;
    value: string | number;
}) => (
    <div className="block">
        <p className="font-semibold">{value}</p>
        <p className="text-[#A8A8A8]">{label}</p>
    </div>
);

const SocialAccounts = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const [socialData, setSocialData] = useState<Social | string>("loading");

    useEffect(() => {
        (async () => {
            const res = await getSocialAccount(user?.userId as string);
            setSocialData((_) => res);
        })();
    }, []);

    if (socialData === "loading") {
        return (
            <section className="flex justify-center items-center py-[6em]">
                <p className="text-[#A8A8A8]">
                    Gathering your Instagram Info...
                </p>
            </section>
        );
    } else if (typeof socialData === "object" && socialData?.username) {
        return (
            <>
                <section className="flex-1 pt-8 md:pt-0 md:px-[2em] lg:px-[4em]">
                    <section className="flex justify-evenly lg:justify-center gap-0 lg:gap-8 pt-[2.5em]">
                        {/* Profile picture */}
                        <div className="flex md:w-[160px] md:h-[160px]">
                            <Image
                                className="cursor-pointer md:w-full md:h-full rounded-full duration-300"
                                src={
                                    socialData?.profile_picture_url ||
                                    "/images/icons/user.png"
                                }
                                alt="profile picture"
                                width={100}
                                height={100}
                            />
                        </div>

                        <div className="block w-1/3">
                            {/* Desktop header */}
                            {/* <div className="hidden md:flex duration-300">
                                <h1 className="text-xl">{""}</h1>
                                <button
                                    className={`mt-4 md:mt-0 md:ml-4 h-[2.2em] ${buttonStyle}`}
                                >
                                    Edit Profile
                                </button>
                                <button className={`ml-2 h-[2.2em] ${buttonStyle}`}>
                                    View archive
                                </button>
                                <Image
                                    className="hidden cursor-pointer md:block dark:invert w-6 h-6 mx-2 my-0.5"
                                    src="https://cdn-icons-png.flaticon.com/512/5693/5693241.png"
                                    alt="settings"
                                    width={20}
                                    height={20}
                                />
                            </div> */}

                            {/* Mobile name */}
                            <p className="md:hidden text-base font-medium">
                                {socialData?.username}
                            </p>

                            {/* Stats section */}
                            <div className="flex w-fit md:gap-6 pt-2 md:pt-6 duration-300">
                                {/* Mobile stats */}
                                <div className="flex md:hidden gap-8">
                                    <ProfileStat
                                        label="posts"
                                        value={socialData?.media_count}
                                    />
                                    <ProfileStat
                                        label="followers"
                                        value={socialData?.followers_count}
                                    />
                                    <ProfileStat
                                        label="following"
                                        value={socialData?.follows_count}
                                    />
                                </div>

                                {/* Desktop stats */}
                                <div className="hidden md:flex gap-6">
                                    <p>
                                        <span className="font-semibold">
                                            {socialData?.media_count}
                                        </span>
                                        <span className="text-[#A8A8A8]">
                                            {" "}
                                            posts
                                        </span>
                                    </p>
                                    <p>
                                        <span className="font-semibold">
                                            {socialData?.followers_count}
                                        </span>
                                        <span className="text-[#A8A8A8]">
                                            {" "}
                                            followers
                                        </span>
                                    </p>
                                    <p>
                                        <span className="font-semibold">
                                            {socialData?.follows_count}
                                        </span>
                                        <span className="text-[#A8A8A8]">
                                            {" "}
                                            following
                                        </span>
                                    </p>
                                </div>
                            </div>

                            {/* Desktop bio section */}
                            <div className="pt-8 hidden md:block gap-0">
                                <p>{socialData?.username}</p>
                                <p>{socialData?.biography}</p>
                                {socialData.website && (
                                    <div className="flex text-[#00376B] dark:text-[#E0E2EF]">
                                        <RiLinkM
                                            size={16}
                                            className="my-auto mr-1"
                                        />
                                        <Link
                                            className="hover:underline text-sm font-semibold"
                                            href={socialData?.website}
                                            target="blank"
                                        >
                                            {socialData?.website?.replace(
                                                "https://",
                                                "",
                                            )}
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Mobile bio section */}
                    <section className="pt-8 px-4 block md:hidden gap-0">
                        <p>{socialData?.biography}</p>
                        {socialData.website && (
                            <div className="flex text-[#00376B] dark:text-[#E0E2EF]">
                                <RiLinkM size={16} className="my-auto mr-1" />
                                <Link
                                    className="hover:underline text-sm font-semibold"
                                    href={socialData?.website}
                                    target="blank"
                                >
                                    {socialData?.website?.replace(
                                        "https://",
                                        "",
                                    )}
                                </Link>
                            </div>
                        )}
                    </section>

                    {/* Mobile buttons */}
                    {/* <div className="flex md:hidden duration-300 w-full px-4 pt-4">
                        <button className={`w-[50%] h-[2.5em] ${buttonStyle}`}>
                            Edit Profile
                        </button>
                        <button className={`ml-2 w-[50%] h-[2.5em] ${buttonStyle}`}>
                            Share profile
                        </button>
                    </div> */}
                </section>
                <ProfileTabs userId={user?.username!} />
                <Posts media={socialData.media} />
            </>
        );
    } else {
        return (
            <section className="flex flex-col gap-4">
                <p>Account not found</p>
            </section>
        );
    }
};

export default SocialAccounts;
