import Tiles from "../ui/Tiles";
import { IProfileUser } from "@/types/profile/profile.type";
import { featuredCreators } from "@/services";
import Link from "next/link";
import { GoArrowUp } from "react-icons/go";

const Featured = async () => {
    const creators = await featuredCreators({
        next: { revalidate: 60 },
    });

    return (
        <section className="w-full">
            <div className="flex items-end justify-between">
                <h1 className="font-semibold text-xl">Featured</h1>
                <div className="relative text-primary cursor-pointer text-sm flex items-center group transition-colors duration-150 w-fit hover:text-lime-500">
                    <p className="absolute left-0 whitespace-nowrap transition-transform duration-200 group-hover:translate-x-[-24px]">
                        View All
                    </p>

                    <div className="pl-[30px]">
                        <GoArrowUp
                            size={17}
                            className="opacity-0 duration-300 group-hover:rotate-90 group-hover:opacity-100 text-lime-500"
                        />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 py-[1em]">
                {creators && creators.length ? (
                    creators.map((creator: IProfileUser, i: number) => (
                        <Link href={`/${creator.username}`} key={i}>
                            <Tiles creator={creator} wrapInView={true} />
                        </Link>
                    ))
                ) : (
                    <p>No creators found</p>
                )}
            </div>
        </section>
    );
};

export default Featured;
