import React from "react";
import { findUser } from "@/services";
import { IProfileUser } from "@/types/profile/profile.type";
import { notFound } from "next/navigation";
import { UserDataProvider } from "@/contexts/UserDataContext";
import Logout from "@/components/profile/Logout";

const Layout = async ({
    children,
    personalDetails,
    earning,
    params,
}: {
    children: React.ReactNode;
    personalDetails: React.ReactNode;
    earning: React.ReactNode;
    params: Promise<{ userid: string }>;
}) => {
    const userid = (await params).userid;
    const userData = (await findUser(userid)) as IProfileUser;

    if (!userData) {
        notFound();
    }

    return (
        <UserDataProvider userData={userData}>
            <main className="flex flex-col md:flex-row flex-1 gap-4 p-2 sm:p-4">
                {personalDetails}
                {earning}
                {children}
                <Logout />
            </main>
        </UserDataProvider>
    );
};

export default Layout;
