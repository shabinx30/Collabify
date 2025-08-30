import { findUser } from "@/services";
import { IUser } from "@/types/auth/signup.type";
import { IProfile } from "@/types/profile/profile.type";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

export default async function Profile({ params }: IProfile) {
    const userid = (await params).userid;
    const data = (await findUser(userid)) as IUser;

    if (!data) {
        notFound();
    }

    return (
        <section className="flex justify-center">
            <div className="flex gap-10 justify-between items-center">
                <Image
                    className="w-32 rounded-full border-4 border-[#2b2b2b]"
                    width={100}
                    height={100}
                    src={data.profile}
                    alt={data.username}
                />
                <h3 className="font-semibold text-lg">
                    {data.username}
                </h3>
            </div>
        </section>
    );
}
