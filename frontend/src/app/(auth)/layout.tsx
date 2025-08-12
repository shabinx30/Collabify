"use client";

import React from "react";
import { store, persistor } from "@/redux/store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { AnimatePresence, motion } from "framer-motion";
import "../../components/auth/auth.css";

const Root = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={store}>
            <PersistGate loading={false} persistor={persistor}>
                <Layout>{children}</Layout>
            </PersistGate>
        </Provider>
    );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="flex justify-center items-center h-screen bg-gray-50 dark:bg-black">
            <AnimatePresence mode="wait">
                <motion.div
                    layout
                    animate={{height: "auto"}}
                    className="bg-white dark:bg-[#1b1b1b] p-6 rounded-3xl w-full mx-4 sm:w-[80%] md:mt-0 md:w-1/2 lg:w-[calc(1/2.5*100%)] xl:w-1/3"
                >
                    {children}
                </motion.div>
            </AnimatePresence>
        </main>
    );
};

export default Root;
