import NavBar from "@/components/NavBar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <NavBar />
            {children}
        </>
    );
};

export default Layout;
