import { IProfileUser } from "@/types/profile/profile.type";
import Image from "next/image";
import { ViewTransition } from "react";

const Tiles = ({
    creator,
    wrapInView,
}: {
    creator: IProfileUser;
    wrapInView: boolean;
}) => {
    return (
        <div className="aspect-9/14">
            <div className="relative h-[84%] w-full">
                <div className="absolute z-10 inset-0 bg-linear-to-b from-black/60 to-transparent h-1/4 rounded-2xl" />
                {wrapInView ? (
                    <ViewTransition name={creator._id}>
                        <Image
                            className="object-cover w-full h-full rounded-2xl"
                            src={creator.profile ?? "/images/infu-1.jpeg"}
                            alt="infu"
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </ViewTransition>
                ) : (
                    <Image
                        className="object-cover w-full h-full rounded-2xl"
                        src={creator.profile ?? "/images/infu-1.jpeg"}
                        alt="infu"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                )}
                <p className="absolute z-20 top-2 left-2.5 text-white text-sm font-semibold">{creator.username}</p>
            </div>
            <div className="flex justify-between text-[0.9rem]">
                <div>
                    {/* we wanna list cat in here */}
                    <p>{creator.categories.join(", ") || "NA"}</p>
                    <p className="text-gray-600 dark:text-gray-400">
                        {creator.location || "NA"}
                    </p>
                </div>
                <strong className="text-base">${creator.amount || "NA"}</strong>
            </div>
        </div>
    );
};

export default Tiles;
