import Tiles from "../ui/Tiles";
import { IProfileUser } from "@/types/profile/profile.type";

const Featured = async () => {
    const creators = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/creators`,
        {
            next: { revalidate: 60 },
        },
    ).then((res) => res.json());

    return (
        <section>
            <h1 className="font-semibold text-xl">Featured</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 py-[1em]">
                {creators && creators.length ? (
                    creators.map((creator: IProfileUser, i: number) => (
                        <Tiles key={i} creator={creator} />
                    ))
                ) : (
                    <p>No creators found</p>
                )}
            </div>
        </section>
    );
};

export default Featured;
