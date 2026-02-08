import NavBar from "@/components/NavBar";
import Aside from "@/components/profile/Aside";
import { UserDataProvider } from "@/contexts/UserDataContext";
import { findUser } from "@/services";
import { IProfileUser } from "@/types/profile/profile.type";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

const Layout = async ({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ userid: string }>;
}) => {
    const userid = (await params).userid;
    const userData = (await findUser(userid)) as IProfileUser;

    if (!userData) {
        notFound();
    }

    return (
        <Suspense>
            <UserDataProvider userData={userData}>
                <NavBar />
                <Aside>{children}</Aside>
            </UserDataProvider>
        </Suspense>
    );
};

export default Layout;
