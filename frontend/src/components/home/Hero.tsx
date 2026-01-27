import SearchBox from "../search/SearchBox";

const Hero = () => {

    return (
        <section className="w-full bg-white dark:bg-[#1b1b1b] flex flex-col items-center gap-4">
            <div className="overflow-hidden pb-1">
                <h3 className="w-full text-2xl md:text-3xl lg:text-[2.5rem] font-semibold text-center slide-up">
                    Symplifiying Influencer Marketing For Everyone
                </h3>
            </div>
            <div className="flex justify-center overflow-hidden">
                <p className="text-gray-800 dark:text-gray-300/75 w-[75%] text-xs md:text-sm lg:w-[60%] text-center leading-[1.2] slide-up-3">
                    Discover a smarter way to connect with content creators,
                    launch campaigns, and grow your all in one simple, seamless
                    platform.
                </p>
            </div>
            <SearchBox />
        </section>
    );
};

export default Hero;
