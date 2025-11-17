"use client";

import ProfileTabs from "@/components/profile/socialAccounts/Tabs";
import Posts from "@/components/profile/socialAccounts/Posts";
import { RootState } from "@/redux/store/store";
import Image from "next/image";
import Link from "next/link";
import { RiLinkM } from "react-icons/ri";
import { useSelector } from "react-redux";

const profileData = {
    name: "SHABIN",
    bio: "🧑‍💻 Web Developer",
    website: "https://shabeensharih.com",
    posts: 16,
    followers: "743M",
    following: 1214,
};

// button style
const buttonStyle =
    "px-4 py-1 bg-[#efefef] hover:bg-[#DBDBDB] dark:bg-[#333333] rounded-lg dark:hover:bg-[#262626] text-sm duration-150";

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
    return (
        <>
            <section className="flex-1 pt-8 md:pt-0 md:px-[2em] lg:px-[4em]">
                <section className="flex justify-evenly lg:justify-center gap-0 lg:gap-8 pt-[2.5em]">
                    {/* Profile picture */}
                    <div className="flex md:w-[160px] md:h-[160px]">
                        <Image
                            className="cursor-pointer md:w-full md:h-full rounded-full duration-300"
                            src={user?.profile || "/images/icons/user.png"}
                            alt="profile picture"
                            width={100}
                            height={100}
                        />
                    </div>

                    <div className="block">
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
                            {profileData.name}
                        </p>

                        {/* Stats section */}
                        <div className="flex gap-1 md:gap-6 pt-2 md:pt-6 duration-300">
                            {/* Mobile stats */}
                            <div className="flex md:hidden gap-8">
                                <ProfileStat
                                    label="posts"
                                    value={profileData.posts}
                                />
                                <ProfileStat
                                    label="followers"
                                    value={profileData.followers}
                                />
                                <ProfileStat
                                    label="following"
                                    value={profileData.following}
                                />
                            </div>

                            {/* Desktop stats */}
                            <div className="hidden md:flex gap-6">
                                <p>
                                    <span className="font-semibold">
                                        {profileData.posts}
                                    </span>
                                    <span className="text-[#A8A8A8]">
                                        {" "}
                                        posts
                                    </span>
                                </p>
                                <p>
                                    <span className="font-semibold">
                                        {profileData.followers}
                                    </span>
                                    <span className="text-[#A8A8A8]">
                                        {" "}
                                        followers
                                    </span>
                                </p>
                                <p>
                                    <span className="font-semibold">
                                        {profileData.following}
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
                            <p>{profileData.name}</p>
                            <p>{profileData.bio}</p>
                            <div className="flex text-[#00376B] dark:text-[#E0E2EF]">
                                <RiLinkM size={16} className="my-auto mr-1" />
                                <Link
                                    className="hover:underline text-sm font-semibold"
                                    href={profileData.website}
                                    target="blank"
                                >
                                    {profileData.website.replace(
                                        "https://",
                                        ""
                                    )}
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mobile bio section */}
                <section className="pt-8 px-4 block md:hidden gap-0">
                    <p>{profileData.bio}</p>
                    <div className="flex text-[#00376B] dark:text-[#E0E2EF]">
                        <RiLinkM size={16} className="my-auto mr-1" />
                        <Link
                            className="hover:underline text-sm font-semibold"
                            href={profileData.website}
                            target="blank"
                        >
                            {profileData.website.replace("https://", "")}
                        </Link>
                    </div>
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
            <Posts  />
        </>
    );
};

export default SocialAccounts;
