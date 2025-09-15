"use client";

import React from "react";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
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
        <section className="flex-1">
            <h3 className="text-[#ffcc00]">Earning</h3>
            <div className="bg-gray-100 dark:bg-[#2b2b2b] w-full h-full rounded-xl px-3 pt-3">
                <ResponsiveContainer>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        {/* <YAxis /> */}
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
                            stroke="#ffcc00"
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
