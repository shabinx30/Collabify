import { ViewTransition } from "react";
import { FiSearch } from "react-icons/fi";
import { BsStars } from "react-icons/bs";

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
            <ViewTransition name="search-bar">
                <div className="flex justify-between items-center mt-12 px-6 py-4 border border-[#868686] dark:border-gray-600 bg-gray-100 dark:bg-[#2b2b2b] rounded-3xl w-[50%]">
                    <div className="flex items-center gap-3 w-full">
                        <FiSearch size={18} />
                        <form autoComplete="off" className="w-full">
                            <input
                                type="search"
                                name="search"
                                className="w-full outline-none"
                                placeholder="Search in any way you want..."
                            />
                        </form>
                    </div>
                    <BsStars size={20} className="text-green-400" />
                </div>
            </ViewTransition>
        </section>
    );
};

export default Hero;
