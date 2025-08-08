"use client";

import React from "react";
import { store, persistor } from "@/redux/store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

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
        <main className="flex flex-col md:flex-row gap-8 md:gap-0">
            <section className="bg-gray-50 flex-1/4 dark:bg-black">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:px-0 lg:py-0">
                    <div className="w-full bg-white rounded-3xl shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-[#1b1b1b] dark:border-[#2b2b2b]">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            {children}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Root;
