import { FaInstagram, FaYoutube } from "react-icons/fa6";
import { VscEye } from "react-icons/vsc";
import { LiaTelegramPlane } from "react-icons/lia";

const Hero = () => {
    return (
        <div className="w-full bg-white flex flex-col items-center px-[2em] lg:px-[6em] xl:px-[12em] pt-[4em]">
            <h1 className="w-full text-black text-3xl md:text-4xl lg:text-5xl font-semibold text-center">
                Symplifiying Influencer Marketing For Everyone
            </h1>
            <p className="text-gray-800 mt-[1em] w-[75%] text-sm md:text-base lg:w-[60%] text-center leading-[1.2]">
                Discover a smarter way to connect with content creators, launch
                campaigns, and grow your, all in one simple, seamless platform.
            </p>
            <div className="bg-[#fff4c9] w-full md:flex p-2 rounded-2xl my-[4em] text-black">
                <div className="flex-1/4">
                    <img
                        className="saturate-[130%] rounded-2xl min-h-full object-cover object-center"
                        src="/images/vlog.jpg"
                        alt="hero.png"
                    />
                </div>
                <div className="flex-1 pl-4 pr-2 py-2 md:py-0 lg:py-2">
                    <div className="flex flex-col h-full justify-between">
                        <div className="flex gap-4 mb-[2em] md:mb-0">
                            <div className="flex-1 flex gap-4 justify-center items-center bg-[#F4E1FF] text-[#7B00E0] h-[2.5em] lg:h-[3em] rounded-2xl">
                                <FaInstagram size={22}/>
                                Instagram
                            </div>
                            <div className="flex-1 flex gap-4 justify-center items-center bg-white h-[2.5em] lg:h-[3em] rounded-2xl">
                                <FaYoutube size={22} className="text-red-500"/>
                                Youtube
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="flex gap-14 justify-center lg:text-lg font-semibold">
                                <h2>Jennifer</h2>
                                <div>
                                    <h2>Followers</h2>
                                    <h2 className="text-center">732k</h2>
                                </div>
                                <h2>$100</h2>
                            </div>
                            <div className="flex gap-2 justify-center">
                                <span className="bg-white px-4 py-0.5 text-[0.8em] lg:text-sm rounded-2xl">
                                    Beauty Marketer
                                </span>
                                <span className="bg-white px-4 py-0.5 text-[0.8em] lg:text-sm rounded-2xl">
                                    Content Creator
                                </span>
                            </div>
                            <div className="flex justify-center gap-8 text-sm">
                                <h2>Los Angeles, US</h2>
                                <h2>⭐5.0</h2>
                            </div>
                        </div>
                        <div className="flex gap-4 mt-[2em] md:mt-0">
                            <div className="flex-1 flex gap-2 justify-center items-center bg-[#FFBF00] font-semibold h-[2.5em] lg:h-[3em] rounded-2xl">
                                <VscEye size={24} />
                                View Profile
                            </div>
                            <div className="flex-1 flex gap-2 justify-center items-center bg-white font-semibold h-[2.5em] lg:h-[3em] rounded-2xl">
                                <LiaTelegramPlane size={22} />
                                Chat
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
