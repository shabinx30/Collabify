import Link from "next/link";
import Tiles from "../ui/Tiles";
import { IProfileUser } from "@/types/profile/profile.type";
import { instagramCreators } from "@/services";

const Instagram = async () => {
    const creators = await instagramCreators({
        next: { revalidate: 60 },
    });

    return (
        <section className="w-full">
            <div className="flex items-end justify-between">
                <h1 className="font-semibold text-xl">Instagram</h1>
                <p className="text-primary cursor-pointer text-sm">View All</p>
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
