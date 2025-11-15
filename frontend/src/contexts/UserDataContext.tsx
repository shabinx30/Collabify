"use client";

import React, { createContext, useContext } from "react";
import { IProfileUser } from "@/types/profile/profile.type";

interface UserDataContextType {
    userData: IProfileUser | null;
}

const UserDataContext = createContext<UserDataContextType>({
    userData: null,
});

export const useUserData = () => useContext(UserDataContext);

export const UserDataProvider = ({
    children,
    userData,
}: {
    children: React.ReactNode;
    userData: IProfileUser;
}) => {
    return (
        <UserDataContext.Provider value={{ userData }}>
            {children}
        </UserDataContext.Provider>
    );
};
