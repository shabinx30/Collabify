"use client"

import PlatformSelector from "@/components/profile/socialAccounts/PlatformSelector";
import React, { useEffect, useState } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {

    const [platform, setPlatform] = useState("instagram")

    useEffect(() => {
        console.log(platform)
    },[platform])

    return (
        <>
            <PlatformSelector platform={platform} setPlatform={setPlatform} />
            {children}
        </>
    );
};

export default Layout;
