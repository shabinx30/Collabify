import { CiImageOn } from "react-icons/ci";

const Benefits = () => {
    return (
        <section className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold">Why Choose us?</h3>
            <section className="bg-[#202020] dark:bg-black flex flex-col gap-[4em] p-4 rounded-3xl">
                <div className="pt-2 pl-2">
                    <h3 className="text-[#FFCF3E] text-xl font-semibold">
                        For Creators
                    </h3>
                    <p className="text-white">
                        A skilled pro who works independently, taking on
                        projects they love on their own terms.
                    </p>
                </div>
                <div className="grid grid-cols-4 gap-2">
                    <div className="aspect-square bg-white dark:bg-[#2b2b2b] rounded-xl p-1">
                        <div className="flex justify-center items-center h-[80%]">
                            <CiImageOn size={40} />
                        </div>
                        <p className="text-sm text-center">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry.
                        </p>
                    </div>
                    <div className="aspect-square bg-white dark:bg-[#2b2b2b] rounded-xl p-1">
                        <div className="flex justify-center items-center h-[80%]">
                            <CiImageOn size={40} />
                        </div>
                        <p className="text-sm text-center">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry.
                        </p>
                    </div>
                    <div className="aspect-square bg-white dark:bg-[#2b2b2b] rounded-xl p-1">
                        <div className="flex justify-center items-center h-[80%]">
                            <CiImageOn size={40} />
                        </div>
                        <p className="text-sm text-center">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry.
                        </p>
                    </div>
                    <div className="aspect-square bg-white dark:bg-[#2b2b2b] rounded-xl p-1">
                        <div className="flex justify-center items-center h-[80%]">
                            <CiImageOn size={40} />
                        </div>
                        <p className="text-sm text-center">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry.
                        </p>
                    </div>
                </div>
            </section>
            <section className="bg-[#202020] dark:bg-black flex flex-col gap-[4em] p-4 rounded-3xl">
                <div className="pt-2 pl-2">
                    <h3 className="text-[#FFCF3E] text-xl font-semibold">
                        For Brands
                    </h3>
                    <p className="text-white">
                        Someone with a goal or idea, looking to team up with the
                        right talent to bring it to life.
                    </p>
                </div>
                <div className="grid grid-cols-4 gap-2">
                    <div className="aspect-square bg-white dark:bg-[#2b2b2b] rounded-xl p-1">
                        <div className="flex justify-center items-center h-[80%]">
                            <CiImageOn size={40} />
                        </div>
                        <p className="text-sm text-center">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry.
                        </p>
                    </div>
                    <div className="aspect-square bg-white dark:bg-[#2b2b2b] rounded-xl p-1">
                        <div className="flex justify-center items-center h-[80%]">
                            <CiImageOn size={40} />
                        </div>
                        <p className="text-sm text-center">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry.
                        </p>
                    </div>
                    <div className="aspect-square bg-white dark:bg-[#2b2b2b] rounded-xl p-1">
                        <div className="flex justify-center items-center h-[80%]">
                            <CiImageOn size={40} />
                        </div>
                        <p className="text-sm text-center">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry.
                        </p>
                    </div>
                    <div className="aspect-square bg-white dark:bg-[#2b2b2b] rounded-xl p-1">
                        <div className="flex justify-center items-center h-[80%]">
                            <CiImageOn size={40} />
                        </div>
                        <p className="text-sm text-center">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry.
                        </p>
                    </div>
                </div>
            </section>
        </section>
    );
};

export default Benefits;
