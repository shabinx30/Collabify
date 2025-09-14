import NavBar from "@/components/NavBar";
import Aside from "@/components/profile/Aside";
import React, { Suspense } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Suspense>
            <NavBar />
            <Aside>{children}</Aside>
        </Suspense>
    );
};

export default Layout;
