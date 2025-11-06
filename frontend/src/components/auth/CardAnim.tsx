"use client";

import { motion } from "framer-motion";
import React from "react";

const CardAnim = ({
    children,
    className,
    ref,
}: {
    children: React.ReactNode;
    className?: string;
    ref?: React.RefObject<HTMLDivElement | null>;
}) => {
    return (
        <motion.section
            layout
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
                type: "spring",
                stiffness: 120,
                damping: 25,
            }}
            className={className}
            ref={ref}
        >
            {children}
        </motion.section>
    );
};

export default CardAnim;
