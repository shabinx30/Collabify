"use client";

import React from "react";
import { store, persistor } from "@/redux/store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { AnimatePresence } from "framer-motion";
import "../../components/auth/auth.css";
import Guard from "@/components/Guard";

const Root = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={store}>
            <PersistGate loading={false} persistor={persistor}>
                <Guard path="auth">
                    <Layout>{children}</Layout>
                </Guard>
            </PersistGate>
        </Provider>
    );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="flex flex-col items-center justify-center-safe min-h-screen bg-gray-100 dark:bg-black px-4 md:px-0">
            <div className="bg-white dark:bg-[#1b1b1b] p-8 rounded-3xl w-full sm:w-[80%] md:w-1/2 lg:w-[calc(1/2.5*100%)] xl:w-1/3 border border-gray-300 dark:border-[#3a3a3a]">
                <AnimatePresence>{children}</AnimatePresence>
            </div>
        </main>
    );
};

export default Root;
