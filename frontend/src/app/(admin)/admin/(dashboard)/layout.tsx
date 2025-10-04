import Aside from "@/components/admin/aside";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return <Aside>{children}</Aside>;
};

export default Layout;
