const Benefits = () => {
    return (
        <section className="flex flex-col gap-2">
            <h3 className="text-black text-xl font-semibold">Why Choose us?</h3>
            <section className="bg-[#202020] flex flex-col gap-[4em] p-4 rounded-3xl">
                <div className="pt-2 pl-2">
                    <h3 className="text-[#FFCF3E] text-xl font-semibold">
                        For Creators
                    </h3>
                    <p>
                        A skilled pro who works independently, taking on
                        projects they love on their own terms.
                    </p>
                </div>
                <div className="grid grid-cols-4 gap-2">
                    <div className="aspect-square bg-white rounded-xl"></div>
                    <div className="aspect-square bg-white rounded-xl"></div>
                    <div className="aspect-square bg-white rounded-xl"></div>
                    <div className="aspect-square bg-white rounded-xl"></div>
                </div>
            </section>
            <section className="bg-[#202020] flex flex-col gap-[4em] p-4 rounded-3xl">
                <div className="pt-2 pl-2">
                    <h3 className="text-[#FFCF3E] text-xl font-semibold">
                        For Brands
                    </h3>
                    <p>
                        Someone with a goal or idea, looking to team up with the
                        right talent to bring it to life.
                    </p>
                </div>
                <div className="grid grid-cols-4 gap-2">
                    <div className="aspect-square bg-white rounded-xl"></div>
                    <div className="aspect-square bg-white rounded-xl"></div>
                    <div className="aspect-square bg-white rounded-xl"></div>
                    <div className="aspect-square bg-white rounded-xl"></div>
                </div>
            </section>
        </section>
    );
};

export default Benefits;
