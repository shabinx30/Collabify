import Tiles from "../ui/Tiles";
import { IProfileUser } from "@/types/profile/profile.type";
import { featuredCreators } from "@/services";
import Link from "next/link";

const Featured = async () => {
    const creators = await featuredCreators({
        next: { revalidate: 60 },
    });

    return (
        <section className="w-full">
            <div className="flex items-end justify-between">
                <h1 className="font-semibold text-xl">Featured</h1>
                <p className="text-primary cursor-pointer text-sm">View All</p>
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
