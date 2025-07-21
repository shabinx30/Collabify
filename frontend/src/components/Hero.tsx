const Hero = () => {
    return (
        <div className="w-full bg-white flex flex-col items-center px-[8em] pt-[4em]">
            <h1 className="text-black text-5xl font-semibold">
                Symplifiying Influencer Marketing For Everyone
            </h1>
            <p className="text-gray-800 mt-[1em] w-[50%] text-center">
                Discover a smarter way to connect with content creators, launch
                campaigns, and grow your, all in one simple, seamless platform.
            </p>
            <div className="bg-[#FFF5CF] w-full p-2 rounded-2xl my-[4em]">
                <img className="w-[50%] saturate-[125%] rounded-2xl" src="/images/vlog.jpg" alt="hero.png" />
            </div>
        </div>
    );
};

export default Hero;
