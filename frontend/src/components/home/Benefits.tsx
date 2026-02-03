import { CiImageOn } from "react-icons/ci";

const Benefits = () => {
    return (
        <section className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold">Why Choose us?</h3>
            <section className="bg-[#202020] flex flex-col gap-[4em] p-4 rounded-3xl">
                <div className="pt-2 pl-2">
                    <h3 className="text-lime-400 text-xl font-semibold">
                        For Creators
                    </h3>
                    <p className="text-white">
                        Produces niche focused content and collaborates with
                        brands to influence audience decisions.
                    </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 items-center">
                    <div className="aspect-square bg-white dark:bg-black rounded-xl p-1">
                        <div className="flex justify-center items-center h-[80%]">
                            <CiImageOn size={40} />
                        </div>
                        <p className="text-sm text-center">
                            Brands reach out to you based on relevance, no cold
                            DMs, no chasing.
                        </p>
                    </div>
                    <div className="aspect-square bg-white dark:bg-black rounded-xl p-1">
                        <div className="flex justify-center items-center h-[80%]">
                            <CiImageOn size={40} />
                        </div>
                        <p className="text-sm text-center">
                            You&rsquo;re matched by niche and engagement, not
                            just follower count.
                        </p>
                    </div>
                    <div className="aspect-square bg-white dark:bg-black rounded-xl p-1">
                        <div className="flex justify-center items-center h-[80%]">
                            <CiImageOn size={40} />
                        </div>
                        <p className="text-sm text-center">
                            See budgets, deliverables, and expectations before
                            you accept.
                        </p>
                    </div>
                    <div className="aspect-square bg-white dark:bg-black rounded-xl p-1">
                        <div className="flex justify-center items-center h-[80%]">
                            <CiImageOn size={40} />
                        </div>
                        <p className="text-sm text-center">
                            A professional profile helps you attract serious,
                            repeat brands.
                        </p>
                    </div>
                </div>
            </section>
            <section className="bg-[#202020] flex flex-col gap-[4em] p-4 rounded-3xl">
                <div className="pt-2 pl-2">
                    <h3 className="text-lime-400 text-xl font-semibold">
                        For Brands
                    </h3>
                    <p className="text-white">
                        Partners with creators to reach targeted audiences and
                        drive measurable marketing results.
                    </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 items-center">
                    <div className="aspect-square bg-white dark:bg-black rounded-xl p-1">
                        <div className="flex justify-center items-center h-[80%]">
                            <CiImageOn size={40} />
                        </div>
                        <p className="text-sm text-center">
                            Search creators by niche, audience, location, and
                            engagement.
                        </p>
                    </div>
                    <div className="aspect-square bg-white dark:bg-black rounded-xl p-1">
                        <div className="flex justify-center items-center h-[80%]">
                            <CiImageOn size={40} />
                        </div>
                        <p className="text-sm text-center">
                            Discover creators who convert, not just those who
                            look popular.
                        </p>
                    </div>
                    <div className="aspect-square bg-white dark:bg-black rounded-xl p-1">
                        <div className="flex justify-center items-center h-[80%]">
                            <CiImageOn size={40} />
                        </div>
                        <p className="text-sm text-center">
                            View real performance data before committing your
                            budget.
                        </p>
                    </div>
                    <div className="aspect-square bg-white dark:bg-black rounded-xl p-1">
                        <div className="flex justify-center items-center h-[80%]">
                            <CiImageOn size={40} />
                        </div>
                        <p className="text-sm text-center">
                            Discover, connect, and collaborate, all in one
                            platform.
                        </p>
                    </div>
                </div>
            </section>
        </section>
    );
};

export default Benefits;
