"use client";

import { getSocialAccount } from "@/services";
import { useEffect, useState } from "react";
import { Social } from "@/types/profile/social.type";
import { FiPlus } from "react-icons/fi";
import AddButton from "@/components/profile/socialAccounts/AddButton";
import { useUserData } from "@/contexts/UserDataContext";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import ProfileSection from "@/components/profile/socialAccounts/ProfileSection";
import { fakeInstaData } from "@/const/fakeInstaData";
import { IoMdLock } from "react-icons/io";

const SocialAccounts = () => {
    const [socialData, setSocialData] = useState<Social | string>("loading");
    const { user } = useSelector((state: RootState) => state.auth);
    const { userData: data } = useUserData();

    useEffect(() => {
        if (!user?.username) return;

        (async () => {
            const res = await getSocialAccount(data?._id as string);
            setSocialData((_) => res);
        })();
    }, []);

    if (socialData === "loading") {
        if (user?.userId === data?._id) {
            return (
                <section className="flex justify-center items-center py-[6em]">
                    <p className="text-[#A8A8A8]">
                        Gathering your Instagram Info...
                    </p>
                </section>
            );
        } else {
            if (user?.username) {
                return (
                    <section className="flex justify-center items-center py-[6em]">
                        <p className="text-[#A8A8A8]">
                            Gathering {user?.username}'s Instagram Info...
                        </p>
                    </section>
                );
            } else {
                return (
                    <section className="relative">
                        <section className="blur-xl">
                            <ProfileSection
                                socialData={fakeInstaData}
                                username={data?.username as string}
                            />
                        </section>
                        <h3 className="absolute flex items-center gap-2 top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/4 text-center">
                            <IoMdLock size={20} />
                            Login to see this profile
                        </h3>
                    </section>
                );
            }
        }
    } else if (typeof socialData === "object" && socialData?.username) {
        return (
            <ProfileSection
                socialData={socialData}
                username={data?.username as string}
            />
        );
    } else {
        return (
            <section className="flex justify-center items-center py-[6em]">
                <div className="flex flex-col gap-4 items-center py-8">
                    <p className="text-gray-500 text-sm">
                        No account added yet!
                    </p>
                    {user?.userId === data?._id && (
                        <AddButton
                            href="/api/auth/instagram"
                            className="bg-black dark:bg-white rounded-3xl text-white dark:text-black py-3 pl-4 pr-5 flex items-center gap-1 cursor-pointer"
                        >
                            <FiPlus />
                            Add an Instagram account
                        </AddButton>
                    )}
                </div>
            </section>
        );
    }
};

export default SocialAccounts;
