import React from "react";
import { Suspense } from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
    return <Suspense>{children}</Suspense>;
};

export default layout;
