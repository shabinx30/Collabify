"use client";

import { findCreators } from "@/services";
import { IProfileUser } from "@/types/profile/profile.type";
import React, { useEffect, useState } from "react";

const Creators = () => {
    const [creators, setCreators] = useState<IProfileUser[]>([]);
    useEffect(() => {
        (async () => {
            const data = await findCreators();
            setCreators(data);
        })();
    }, []);

    return (
        <div className="h-screen w-screen">
            <div className="bg-white p-1 flex-col gap-1">
                {creators.map((creator, index) => (
                    <div key={index}>
                        <p className="text-black">{creator.username}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Creators;
