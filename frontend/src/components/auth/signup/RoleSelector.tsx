import { motion } from "framer-motion";
import { IRoleSelector } from "@/types/auth/signup.type";
import { IoBusiness } from "react-icons/io5";
import { LuMicVocal } from "react-icons/lu";

const RoleSelector = ({ role, setRole }: IRoleSelector) => {
    return (
        <div className="flex w-full text-sm md:text-base relative rounded-xl overflow-hidden bg-gray-100 dark:bg-black mt-2 mb-3">
            {/* Animated background */}
            <motion.div
                initial={false}
                animate={{
                    left: role === "brand" ? "0%" : "50%",
                }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                }}
                className="absolute h-full w-1/2 rounded-xl dark:bg-[#193100] bg-lime-500 dark:border-2 dark:border-lime-500 z-0"
            />

            {/* Buttons */}
            <div
                onClick={() => setRole(() => "brand")}
                className={`flex-1 flex py-3 justify-center items-center gap-2 md:gap-3 z-10 cursor-pointer transition-colors duration-300 ${
                    role === "brand"
                        ? "dark:text-lime-500"
                        : "dark:text-gray-300"
                }`}
            >
                <IoBusiness />
                Join as Brand
            </div>
            <div
                onClick={() => setRole(() => "creator")}
                className={`flex-1 flex py-3 justify-center items-center gap-2 md:gap-3 z-10 cursor-pointer transition-colors duration-300 ${
                    role === "creator"
                        ? "dark:text-lime-500"
                        : "dark:text-gray-300"
                }`}
            >
                <LuMicVocal />
                Join as Creator
            </div>
        </div>
    );
};

export default RoleSelector;
