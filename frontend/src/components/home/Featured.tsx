const Featured = () => {
    return (
        <section className="px-[2em] lg:px-[6em] xl:px-[12em] bg-white text-black">
            <h1 className="font-semibold text-xl">Featured</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 py-[1em]">
                <div className="aspect-[9/11]">
                    <div className="bg-gray-300 h-[84%] w-full rounded-xl">
                        {/* image */}
                    </div>
                    <div className="flex justify-between text-[0.9rem]">
                        <div>
                            <p>Beauty marketer & Content...</p>
                            <p className="text-gray-600">Los Angeles, US</p>
                        </div>
                        <strong>$100</strong>
                    </div>
                </div>
                <div className="aspect-[9/11]">
                    <div className="bg-gray-300 h-[84%] w-full rounded-xl">
                        {/* image */}
                    </div>
                    <div className="flex justify-between text-[0.9rem]">
                        <div>
                            <p>Beauty marketer & Content...</p>
                            <p className="text-gray-600">Los Angeles, US</p>
                        </div>
                        <strong>$100</strong>
                    </div>
                </div>
                <div className="aspect-[9/11]">
                    <div className="bg-gray-300 h-[84%] w-full rounded-xl">
                        {/* image */}
                    </div>
                    <div className="flex justify-between text-[0.9rem]">
                        <div>
                            <p>Beauty marketer & Content...</p>
                            <p className="text-gray-600">Los Angeles, US</p>
                        </div>
                        <strong>$100</strong>
                    </div>
                </div>
                <div className="aspect-[9/11]">
                    <div className="bg-gray-300 h-[84%] w-full rounded-xl">
                        {/* image */}
                    </div>
                    <div className="flex justify-between text-[0.9rem]">
                        <div>
                            <p>Beauty marketer & Content...</p>
                            <p className="text-gray-600">Los Angeles, US</p>
                        </div>
                        <strong>$100</strong>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Featured;
