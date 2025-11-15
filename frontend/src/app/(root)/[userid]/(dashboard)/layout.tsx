import React from "react";
import { findUser } from "@/services";
import { IProfileUser } from "@/types/profile/profile.type";
import { notFound } from "next/navigation";
import { UserDataProvider } from "@/contexts/UserDataContext";

const Layout = async ({
    children,
    personalDetails,
    params,
}: {
    children: React.ReactNode;
    personalDetails: React.ReactNode;
    params: Promise<{ userid: string }>;
}) => {
    const userid = (await params).userid;
    const userData = (await findUser(userid)) as IProfileUser;

    if (!userData) {
        notFound();
    }

    return (
        <UserDataProvider userData={userData}>
            {personalDetails}
            {children}
        </UserDataProvider>
    );
};

export default Layout;
