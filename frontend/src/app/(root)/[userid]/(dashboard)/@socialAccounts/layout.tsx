"use client"

import PlatformSelector from "@/components/profile/socialAccounts/PlatformSelector";
import React, { useState } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const [platform, setPlatform] = useState("instagram")

    return (
        <div>
            <PlatformSelector platform={platform} setPlatform={setPlatform} />
            {children}
        </div>
    );
};

export default Layout;
