"use client"

import NavBar from "@/components/NavBar";
import { persistor, store } from "@/redux/store/store";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={store}>
            <PersistGate loading={false} persistor={persistor}>
                <NavBar />
                {children}
            </PersistGate>
        </Provider>
    );
};

export default Layout;
