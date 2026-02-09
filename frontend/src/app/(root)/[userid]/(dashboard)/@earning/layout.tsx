"use client";

import { useUserData } from "@/contexts/UserDataContext";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const { userData: profileUser } = useUserData();
    if (profileUser?.role !== "creator") {
        return null;
    }
    return children;
};

export default Layout;
