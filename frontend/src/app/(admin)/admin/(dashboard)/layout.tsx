import Aside from "@/components/admin/aside";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="bg-[#f0f5ff] dark:bg-[#0B1437] h-full">
            <Aside>{children}</Aside>
        </main>
    );
};

export default Layout;
