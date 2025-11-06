import { FaInstagram, FaYoutube } from "react-icons/fa6";
import { VscEye } from "react-icons/vsc";
import { LiaTelegramPlane } from "react-icons/lia";
import Image from "next/image";

const Hero = () => {
    return (
        <section className="w-full bg-white dark:bg-[#1b1b1b] flex flex-col items-center">
            <div className="overflow-hidden pb-1">
                <h3 className="w-full text-2xl md:text-3xl lg:text-[2.5rem] font-semibold text-center slide-up">
                    Symplifiying Influencer Marketing For Everyone
                </h3>
            </div>
            <div className="flex justify-center overflow-hidden">
                <p className="text-gray-800 dark:text-gray-300/75 mt-[1em] w-[75%] text-xs md:text-sm lg:w-[60%] text-center leading-[1.2] slide-up-3">
                    Discover a smarter way to connect with content creators,
                    launch campaigns, and grow your all in one simple, seamless
                    platform.
                </p>
            </div>
            <div className="bg-[#fff4c9] dark:bg-black w-full md:flex p-2 rounded-3xl mt-[4em] text-black dark:text-white slide-up-opacity">
                <div className="flex-1/4 relative aspect-video">
                    <Image
                        className="saturate-130 rounded-2xl object-cover object-center"
                        src="/images/vlog.jpg"
                        alt="hero.png"
                        fill
                        placeholder="blur"
                        blurDataURL="/images/vlog_low.jpg"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>
                <div className="flex-1 pl-4 pr-2 py-2 md:py-0 lg:py-2">
                    <div className="flex flex-col h-full justify-between">
                        <div className="flex gap-4 mb-[2em] md:mb-0 text-sm">
                            <div className="flex-1 flex gap-4 justify-center items-center bg-[#F4E1FF] dark:bg-[#46255a] text-[#7B00E0] dark:text-[#ecd4ff] h-[2.5em] lg:h-[3em] rounded-2xl cursor-pointer">
                                <FaInstagram size={22} />
                                Instagram
                            </div>
                            <div className="flex-1 flex gap-4 justify-center items-center bg-white dark:bg-[#2b2b2b] h-[2.5em] lg:h-[3em] rounded-2xl cursor-pointer">
                                <FaYoutube size={22} className="text-red-500" />
                                Youtube
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="flex gap-14 justify-center text-sm md:text-base font-semibold">
                                <h2>Jennifer</h2>
                                <div>
                                    <h2>Followers</h2>
                                    <h2 className="text-center">732k</h2>
                                </div>
                                <h2>$100</h2>
                            </div>
                            <div className="flex gap-2 text-xs justify-center">
                                <span className="bg-white dark:bg-[#2b2b2b] px-4 py-0.5 rounded-2xl">
                                    Beauty Marketer
                                </span>
                                <span className="bg-white dark:bg-[#2b2b2b] px-4 py-0.5 rounded-2xl">
                                    Content Creator
                                </span>
                            </div>
                            <div className="flex justify-center gap-8 text-[0.8em]">
                                <h2>Los Angeles, US</h2>
                                <h2>⭐5.0</h2>
                            </div>
                        </div>
                        <div className="flex gap-4 mt-[2em] md:mt-0 text-sm">
                            <div className="flex-1 flex gap-2 justify-center items-center bg-[#FFBF00] dark:bg-[#312500] border-2 border-[#FFBF00] dark:text-[#FFBF00] font-semibold h-[2.5em] lg:h-[3em] rounded-2xl cursor-pointer">
                                <VscEye size={24} />
                                View Profile
                            </div>
                            <div className="flex-1 flex gap-2 justify-center items-center bg-white dark:bg-[#2b2b2b] font-semibold h-[2.5em] lg:h-[3em] rounded-2xl cursor-pointer">
                                <LiaTelegramPlane size={22} />
                                Chat
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
