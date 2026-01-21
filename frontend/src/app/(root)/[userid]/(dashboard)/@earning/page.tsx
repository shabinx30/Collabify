"use client";

import React from "react";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

const Earning = () => {
    const data = [
        { month: "Jan", earnings: 400 },
        { month: "Feb", earnings: 400 },
        { month: "Mar", earnings: 2200 },
        { month: "Apr", earnings: 600 },
        { month: "May", earnings: 3200 },
        { month: "Jun", earnings: 3000 },
        { month: "Jul", earnings: 300 },
        { month: "Aug", earnings: 4500 },
        { month: "Sep", earnings: 3500 },
        { month: "Oct", earnings: 6000 },
        { month: "Nov", earnings: 9000 },
        { month: "Dec", earnings: 8000 },
    ];

    return (
        <section className="flex-1 min-w-0">
            <h3 className="text-green-400">Earning</h3>
            <div className="bg-gray-100 dark:bg-[#2b2b2b] w-full h-full min-h-[300px] md:min-h-0 rounded-xl px-2 sm:px-3 pt-3 pb-2">
                <ResponsiveContainer width="100%" height="100%" minHeight={250}>
                    <LineChart data={data}>
                        <CartesianGrid stroke="#5d5d5d" strokeDasharray="3 3" />
                        <XAxis dataKey="month" fontSize={12} stroke="#5d5d5d" />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#3d3d3d",
                                border: "none",
                                borderRadius: "10px",
                                color: "#f9fafb",
                            }}
                            labelStyle={{ color: "#9ca3af" }}
                            itemStyle={{ color: "#f9fafb" }}
                        />
                        <Line
                            type="monotone"
                            dataKey="earnings"
                            stroke="#05df72"
                            strokeWidth={3}
                            dot={{ r: 3 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </section>
    );
};

export default Earning;
