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
    socialAccounts,
    params,
}: {
    children: React.ReactNode;
    personalDetails: React.ReactNode;
    earning: React.ReactNode;
    socialAccounts: React.ReactNode;
    params: Promise<{ userid: string }>;
}) => {
    const userid = (await params).userid;
    const userData = (await findUser(userid)) as IProfileUser;

    if (!userData) {
        notFound();
    }

    return (
        <UserDataProvider userData={userData}>
            <main className="flex flex-col gap-8 p-2 sm:p-4">
                <section className="flex flex-col md:flex-row flex-1 gap-4">
                    {personalDetails}
                    {earning}
                    {children}
                    <Logout />
                </section>
                <section className="bg-gray-100 dark:bg-black rounded-3xl mt-2">{socialAccounts}</section>
            </main>
        </UserDataProvider>
    );
};

export default Layout;
