import { BenefitsList } from "@/const/benefits.home";
import Image from "next/image";

const Benefits = () => {
    return (
        <section className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold">Why Choose us?</h3>
            {BenefitsList.map((sec, i) => (
                <section key={i} className="bg-[#202020] flex flex-col gap-[4em] p-4 rounded-3xl">
                    <div className="pt-2 pl-2">
                        <h3 className="text-lime-400 text-xl font-semibold">
                            {sec.for}
                        </h3>
                        <p className="text-white">{sec.heading}</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 items-center">
                        {sec.benefits.map((ben, j) => (
                            <div key={j} className="relative aspect-3/4 bg-white dark:bg-black rounded-xl">
                                <div className="flex justify-center items-center h-full w-full">
                                    <Image
                                        className="object-cover object-center w-full h-full rounded-xl"
                                        src={`/images/${ben.image}`}
                                        alt={ben.image}
                                        width={100}
                                        height={100}
                                        loading="lazy"
                                    />
                                </div>
                                <div className="absolute h-1/2 bottom-0 flex items-end p-3 text-white bg-linear-to-t from-black to-transparent text-sm text-left rounded-b-xl">
                                    {ben.text}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            ))}
        </section>
    );
};

export default Benefits;
