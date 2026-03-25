import SearchBox from "../search/SearchBox";

const Hero = () => {

    return (
        <section className="w-full bg-white dark:bg-black flex flex-col items-center gap-4">
            <div className="overflow-hidden pb-1">
                <h3 className="w-full text-3xl md:text-4xl lg:text-[3.75rem] font-bold text-center slide-up">
                    Discover the <span className="text-lime-400 italic font-normal">Righ</span> Voice
                </h3>
            </div>
            <div className="flex justify-center overflow-hidden mb-[4em]">
                <p className="text-gray-800 dark:text-gray-300/75 w-[75%] text-xs md:text-sm lg:w-[60%] text-center leading-[1.2] slide-up-3">
                    Discover a smarter way to connect with content creators,
                    launch campaigns, and grow your all in one simple, seamless
                    platform.
                </p>
            </div>
            <SearchBox wrapInView={true} />
        </section>
    );
};

export default Hero;
