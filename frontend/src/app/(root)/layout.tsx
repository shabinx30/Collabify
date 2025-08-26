"use client";

import { persistor, store } from "@/redux/store/store";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={store}>
            <PersistGate loading={false} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    );
};

export default Layout;
