"use client"

import PlatformSelector from "@/components/profile/PlatformSelector";
import React, { useState } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {

    const [platform, setPlatform] = useState("instagram")

    return (
        <>
            <PlatformSelector platform={platform} setPlatform={setPlatform} />
            {children}
        </>
    );
};

export default Layout;
