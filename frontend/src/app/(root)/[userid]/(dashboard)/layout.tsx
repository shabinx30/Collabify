import React from "react";
import Logout from "@/components/profile/Logout";

const Layout = async ({
    children,
    personalDetails,
    earning,
    socialAccounts,
}: {
    children: React.ReactNode;
    personalDetails: React.ReactNode;
    earning: React.ReactNode;
    socialAccounts: React.ReactNode;
}) => {
    return (
        <main className="flex flex-col gap-8 p-2 sm:p-4">
            <section className="flex flex-col md:flex-row flex-1 gap-4">
                {personalDetails}
                {earning}
                {children}
                <Logout />
            </section>
            <section className="bg-gray-100 dark:bg-black rounded-3xl mt-2">
                {socialAccounts}
            </section>
        </main>
    );
};

export default Layout;
