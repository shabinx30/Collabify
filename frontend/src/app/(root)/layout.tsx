"use client";

import Footer from "@/components/Footer";
import { persistor, store } from "@/redux/store/store";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={store}>
            <PersistGate loading={false} persistor={persistor}>
                <div className="flex flex-col h-screen">
                    <div className="flex flex-col flex-1">{children}</div>
                    <Footer />
                </div>
            </PersistGate>
        </Provider>
    );
};

export default Layout;
