import { findUser } from "@/services";
import { IProfile, IProfileUser } from "@/types/profile/profile.type";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

export default async function Profile({ params }: IProfile) {
    const userid = (await params).userid;
    const data = (await findUser(userid)) as IProfileUser;

    if (!data) {
        notFound();
    }

    data.categories.push("content creator");
    data.categories.push("beauty");

    return (
        <main className="flex gap-4 p-4">
            <section className="flex-1">
                <h3 className="text-amber-400">Person Details</h3>
                <div className="flex bg-[#2b2b2b] rounded-xl p-2">
                    <div className="relative max-h-fit">
                        <Image
                            className="min-w-36 rounded-2xl"
                            width={100}
                            height={100}
                            src={data.profile}
                            alt={data.username}
                        />
                        <div className="absolute bottom-1 left-1 py-2 w-[calc(100%-8px)] bg-[#ffffff80] backdrop-blur-md rounded-full">
                            <p className="text-center text-black text-sm">
                                change profile photo
                            </p>
                        </div>
                    </div>
                    <section className="flex flex-col w-full gap-3 mx-10">
                        <div className="flex justify-between">
                            <div className="leading-[1.25]">
                                <span className="text-gray-400 text-xs">
                                    Name
                                </span>
                                <h3>{data.username}</h3>
                            </div>
                            <div className="leading-[1.25]">
                                <span className="text-gray-400 text-xs">
                                    Charge
                                </span>
                                <h3>{data.amount ? data.amount : 0}$</h3>
                            </div>
                        </div>
                        <div className="leading-[1.25]">
                            <span className="text-gray-400 text-xs">Email</span>
                            <h3>{data.email}</h3>
                        </div>
                        <div className="flex justify-between">
                            <div>
                                <span className="text-gray-400 text-xs">
                                    Tags
                                </span>
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
                            </div>
                            <div className="leading-[1.25]">
                                <span className="text-gray-400 text-xs">
                                    Location
                                </span>
                                <h3>{data.location ? data.location : "NA"}</h3>
                            </div>
                        </div>
                    </section>
                </div>
            </section>
            <section className="flex-1">
                <h3 className="text-amber-400">Earning</h3>
                <div className="bg-[#2b2b2b] rounded-xl p-2"></div>
            </section>
        </main>
    );
}
