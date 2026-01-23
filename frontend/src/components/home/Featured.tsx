import Tiles from "../ui/Tiles";
import { IProfileUser } from "@/types/profile/profile.type";
import { searchCreators } from "@/services";

const Featured = async () => {
    const creators = await searchCreators({
        next: { revalidate: 60 },
    });

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
