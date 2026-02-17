import Link from "next/link";
import Tiles from "../ui/Tiles";
import { IProfileUser } from "@/types/profile/profile.type";
import { instagramCreators } from "@/services";
import { GoArrowUp, GoArrowUpRight } from "react-icons/go";

const Instagram = async () => {
    const creators = await instagramCreators({
        next: { revalidate: 60 },
    });

    return (
        <section className="w-full">
            <div className="flex items-end justify-between">
                <h1 className="font-semibold text-xl">Instagram</h1>
                <div className="relative text-primary cursor-pointer text-sm flex items-center group hover:text-lime-500 transition-colors duration-150 w-fit">
                    <p className="absolute left-0 whitespace-nowrap transition-transform duration-200 group-hover:translate-x-[-24px]">
                        View All
                    </p>

                    <div className="pl-[30px]">
                        <GoArrowUp
                            size={17}
                            className="transition-transform opacity-0 duration-300 group-hover:rotate-90 group-hover:opacity-100"
                        />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 py-[1em]">
                {creators && creators.length ? (
                    creators.map((creator: IProfileUser, i: number) => (
                        <Link href={`/${creator.username}`} key={i}>
                            <Tiles creator={creator} wrapInView={false} />
                        </Link>
                    ))
                ) : (
                    <p>No creators found</p>
                )}
            </div>
        </section>
    );
};

export default Instagram;
