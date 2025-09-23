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
                {children}
                <Footer />
            </PersistGate>
        </Provider>
    );
};

export default Layout;
