import { ViewTransition } from "react";
import { FiSearch } from "react-icons/fi";
import { BsStars } from "react-icons/bs";

const Hero = () => {
    const searchPlaceholders = [
        "Who are the top tech creators in India?",
        "Fashion creators in India with 4-star ratings",
        "Find beauty influencers on Instagram",
        "Best tech creators on YouTube",
    ];

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
            <ViewTransition name="search-bar">
                <div className="flex w-full md:w-[75%] lg:w-[60%] justify-between items-center mt-12 px-3 md:px-6 py-3 md:py-4 border border-[#868686] dark:border-gray-600 bg-gray-100 dark:bg-[#2b2b2b] rounded-3xl">
                    <div className="flex items-center gap-1.5 md:gap-3 w-full">
                        <FiSearch size={18} />
                        <form
                            autoComplete="off"
                            className="relative w-full overflow-hidden search-container text-xs md:text-base"
                        >
                            <input
                                type="search"
                                name="search"
                                className="relative w-full outline-none bg-transparent z-2"
                                placeholder="Try"
                            />
                            <div className="placeholder-scroll left-[22px] md:left-[30px]">
                                {searchPlaceholders.map((val, i) => (
                                    <div key={i} className="placeholder-item">
                                        {`"${val}"`}
                                    </div>
                                ))}
                            </div>
                        </form>
                    </div>
                    <BsStars size={20} className="text-green-400" />
                </div>
            </ViewTransition>
        </section>
    );
};

export default Hero;
