import { findUser } from "@/services";
import { IUser } from "@/types/auth/signup.type";
import { notFound } from "next/navigation";
import React from "react";

const Profile = async ({ params }: { params: { userid: string } }) => {
    const { userid } = await params;
    const data: IUser = await findUser(userid);
    if (!data) {
        notFound();
    }
    console.log(data)

    return (
        <div className="pt-[10em] text-white">
            <p>{data.username}</p>
        </div>
    );
};

export default Profile;
