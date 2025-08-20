import { findUser } from "@/services";
import { IProfile } from "@/types/profile/profile.type";
import { notFound } from "next/navigation";
import React from "react";

export default async function Profile({ params }: IProfile) {
    const userid = (await params).userid;
    const data = await findUser(userid);

    if (!data) {
        notFound();
    }

    return (
        <div className="pt-[10em] text-white">
            <p>{data.username}</p>
        </div>
    );
}
