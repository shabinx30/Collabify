import React from "react";
import Logout from "@/components/profile/Logout";

const Layout = async ({
    children,
    personalDetails,
    earning,
    socialAccounts,
    images,
}: {
    children: React.ReactNode;
    personalDetails: React.ReactNode;
    earning: React.ReactNode;
    socialAccounts: React.ReactNode;
    images: React.ReactNode;
}) => {
    return (
        <main className="flex flex-col gap-4 p-2 sm:p-4">
            <section className="flex flex-col md:flex-row flex-1 gap-4">
                {personalDetails}
                {earning}
                {children}
                <Logout />
            </section>
            {images}
            <section className="bg-gray-100 dark:bg-black rounded-3xl">
                {socialAccounts}
            </section>
        </main>
    );
};

export default Layout;
