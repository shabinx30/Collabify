import Image from "next/image";
import { IProfileUser } from "@/types/profile/profile.type";

const PersonalDetails = ({ data }: { data: IProfileUser }) => {
    return (
        <section className="flex-1 min-w-0">
            <h3 className="text-amber-400">Person Details</h3>
            <div className="flex flex-col lg:flex-row bg-gray-100 dark:bg-[#2b2b2b] h-full min-h-fit rounded-xl p-2 sm:p-4 gap-4">
                <div className="relative max-h-fit shrink-0 self-center lg:self-start">
                    <Image
                        className={`min-w-36 rounded-2xl ${
                            !data.profile ? "contrast-0 dark:contrast-100" : ""
                        }`}
                        width={100}
                        height={100}
                        src={data.profile || "/images/icons/user.png"}
                        alt={data.username}
                    />
                    <div className="absolute bottom-1 left-1 py-2 w-[calc(100%-8px)] bg-[#ffffff80] backdrop-blur-md rounded-full cursor-pointer">
                        <p className="text-center text-black text-xs">
                            change profile photo
                        </p>
                    </div>
                </div>
                <section className="flex flex-col w-full gap-3 lg:ml-4">
                    <div className="flex flex-col lg:flex-row lg:justify-between gap-3 lg:gap-0">
                        <div className="leading-tight flex-1 min-w-0">
                            <span className="text-gray-400 text-xs">Name</span>
                            <h3 className="wrap-break-word">{data.username}</h3>
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <span className="text-gray-400 text-xs">
                                Charge
                            </span>
                            {data.amount ? (
                                <h3>{data.amount}$</h3>
                            ) : (
                                <input
                                    type="number"
                                    className="custom-dotted-border rounded-xl p-1.5 outline-none focus:outline-amber-400 w-full lg:w-24 h-[2em] text-xs"
                                    placeholder="Eg:- 100$"
                                />
                            )}
                        </div>
                    </div>
                    <div className="leading-tight min-w-0">
                        <span className="text-gray-400 text-xs">Email</span>
                        <h3 className="wrap-break-word break-all">
                            {data.email}
                        </h3>
                    </div>
                    <div className="flex flex-col lg:flex-row lg:justify-between gap-3 lg:gap-0">
                        <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                            <span className="text-gray-400 text-xs">Tags</span>
                            {data.categories && data.categories.length ? (
                                <div className="flex gap-1 pt-0.5 flex-wrap">
                                    {data.categories.map((category, i) => (
                                        <p
                                            key={i}
                                            className="bg-amber-400/5 px-2 pt-0.5 pb-1 text-xs text-amber-400 border border-amber-400 rounded-full max-w-fit"
                                        >
                                            {category}
                                        </p>
                                    ))}
                                </div>
                            ) : (
                                <input
                                    type="text"
                                    className="custom-dotted-border rounded-xl p-1.5 outline-none focus:outline-amber-400 w-full h-[2em] text-xs max-w-full"
                                    placeholder="Eg:- Content Creator"
                                />
                            )}
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <span className="text-gray-400 text-xs">
                                Location
                            </span>
                            {data.location ? (
                                <h3 className="wrap-break-word">
                                    {data.location}
                                </h3>
                            ) : (
                                <input
                                    type="text"
                                    className="custom-dotted-border rounded-xl p-1.5 outline-none focus:outline-amber-400 w-full lg:w-24 h-[2em] text-xs"
                                    placeholder="Eg:- Los Angeles, US"
                                />
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </section>
    );
};

export default PersonalDetails;
