import Image from "next/image";
import PostsPage from "./Posts";
import ProfileTabs from "./Tabs";
import { ProfileStat } from "./ProfileStats";
import { RiLinkM } from "react-icons/ri";
import Link from "next/link";
import { Social } from "@/types/profile/social.type";

const ProfileSection = ({
    socialData,
    username,
}: {
    socialData: Social;
    username: string;
}) => {
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
                                {socialData?.website?.replace("https://", "")}
                            </Link>
                        </div>
                    )}
                </section>
            </section>
            <ProfileTabs userId={username} />
            <PostsPage media={socialData.media} />
        </>
    );
};

export default ProfileSection;
