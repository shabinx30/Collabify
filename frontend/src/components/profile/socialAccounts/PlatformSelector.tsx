import { motion } from "framer-motion";
import { FaInstagram } from "react-icons/fa6";
import { AiOutlineYoutube } from "react-icons/ai";
import { useRouter, usePathname } from "next/navigation";

const PlatformSelector = ({
    platform,
    setPlatform,
}: {
    platform: string;
    setPlatform: React.Dispatch<React.SetStateAction<string>>;
}) => {
    const router = useRouter();
    const paths = usePathname()
    const path = paths.split('/')

    const changeRoute = (route: string) => {
        path[2] = route
        setPlatform(() => route ? route : "instagram");
        router.replace(path.join('/'));
    };

    return (
        <div className="flex w-full text-sm md:text-base relative rounded-xl overflow-hidden bg-gray-100 dark:bg-black mb-3">
            {/* Animated background */}
            <motion.div
                initial={false}
                animate={{
                    left: platform !== "youtube" ? "0%" : "50%",
                }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                }}
                className="absolute h-full w-1/2 rounded-xl bg-lime-400 z-0"
            />

            {/* Buttons */}
            <div
                onClick={() => changeRoute("")}
                className={`flex-1 flex py-3 justify-center items-center gap-2 md:gap-3 z-10 cursor-pointer transition-colors duration-300 ${
                    platform === "instagram"
                        ? "text-black"
                        : "text-gray-300"
                }`}
            >
                <FaInstagram size={20} />
                Instagram
            </div>
            <div
                onClick={() => changeRoute("youtube")}
                className={`flex-1 flex py-3 justify-center items-center gap-2 md:gap-3 z-10 cursor-pointer transition-colors duration-300 ${
                    platform === "youtube"
                        ? "text-black"
                        : "text-gray-300"
                }`}
            >
                <AiOutlineYoutube size={20} />
                Youtube
            </div>
        </div>
    );
};

export default PlatformSelector;
