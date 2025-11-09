"use client";

import { useEffect, useState } from "react";
import Tiles from "../ui/Tiles";
import { searchCreators } from "@/services";

const Featured = () => {
    const [creators, setCreators] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await searchCreators();
            setCreators(response);
        })();
    }, []);

    return (
        <section>
            <h1 className="font-semibold text-xl">Featured</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 py-[1em]">
                {creators && creators.length ? (
                    creators.map((creator, i) => (
                        <Tiles key={i} creator={creator} />
                    ))
                ) : (
                    <p>No creators found</p>
                )}
            </div>
        </section>
    );
};

export default Featured;
