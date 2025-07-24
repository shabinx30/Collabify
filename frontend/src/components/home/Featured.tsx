const Featured = () => {
    return (
        <section className="bg-white dark:bg-[#1b1b1b]">
            <h1 className="font-semibold text-xl">Featured</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 py-[1em]">
                <div className="aspect-[9/14]">
                    <div className="h-[84%] w-full">
                        <img className="object-cover w-full h-full rounded-xl" src="/images/infu-1.jpeg" alt="infu" />
                    </div>
                    <div className="flex justify-between text-[0.9rem]">
                        <div>
                            <p>Beauty marketer & Content...</p>
                            <p className="text-gray-600 dark:text-gray-400">Los Angeles, US</p>
                        </div>
                        <strong className="text-base">$100</strong>
                    </div>
                </div>
                <div className="aspect-[9/14]">
                    <div className="h-[84%] w-full">
                        <img className="object-cover w-full h-full rounded-xl" src="/images/infu-2.jpeg" alt="infu" />
                    </div>
                    <div className="flex justify-between text-[0.9rem]">
                        <div>
                            <p>Beauty marketer & Content...</p>
                            <p className="text-gray-600 dark:text-gray-400">Los Angeles, US</p>
                        </div>
                        <strong className="text-base">$100</strong>
                    </div>
                </div>
                <div className="aspect-[9/14]">
                    <div className="h-[84%] w-full">
                        <img className="object-cover w-full h-full rounded-xl" src="/images/infu-3.jpeg" alt="infu" />
                    </div>
                    <div className="flex justify-between text-[0.9rem]">
                        <div>
                            <p>Beauty marketer & Content...</p>
                            <p className="text-gray-600 dark:text-gray-400">Los Angeles, US</p>
                        </div>
                        <strong className="text-base">$100</strong>
                    </div>
                </div>
                <div className="aspect-[9/14]">
                    <div className="h-[84%] w-full ">
                        <img className="object-cover w-full h-full rounded-xl" src="/images/infu-4.jpeg" alt="infu" />
                    </div>
                    <div className="flex justify-between text-[0.9rem]">
                        <div>
                            <p>Beauty marketer & Content...</p>
                            <p className="text-gray-600 dark:text-gray-400">Los Angeles, US</p>
                        </div>
                        <strong className="text-base">$100</strong>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Featured;
