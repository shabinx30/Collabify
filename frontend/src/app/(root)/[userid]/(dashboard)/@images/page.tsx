"use client";

import { useUserData } from "@/contexts/UserDataContext";
import { RootState } from "@/redux/store/store";
import { LuImagePlus } from "react-icons/lu";
import { useSelector } from "react-redux";

const Images = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const { userData: profileUser } = useUserData();

    if (
        profileUser?._id === user?.userId ||
        (profileUser?.images && profileUser?.images?.length > 0)
    ) {
        return (
            <section className="bg-gray-100 dark:bg-[#2b2b2b] rounded-3xl mt-7">
                <div className="flex gap-2 h-[15em] p-2">
                    {profileUser?.images?.map((image: string, i: number) => (
                        <div
                            key={i}
                            className="flex justify-center items-center aspect-square cursor-pointer"
                        >
                            <img
                                className="w-full h-full object-cover rounded-2xl"
                                src={image}
                                alt={image}
                            />
                        </div>
                    ))}
                    {profileUser?._id === user?.userId && (
                        <div className="flex justify-center items-center aspect-square border-dotted border-[3] text-lime-400 rounded-2xl cursor-pointer">
                            <LuImagePlus size={30} />
                        </div>
                    )}
                </div>
            </section>
        );
    } else {
        return <section className="mt-3" />; // margin for social media section
    }
};

export default Images;
