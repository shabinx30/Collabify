import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import { LuFacebook } from "react-icons/lu";

const Footer = () => {
    return (
        <footer className="bg-[#202020] dark:bg-black p-4">
            <h3 className="text-xl text-white my-[2em]">Logo</h3>
            <div className="flex justify-between items-center">
                <p className="text-sm text-gray-400">
                    All right reserved &copy; 2025
                </p>
                <div className="flex gap-2">
                    <a target="_blank" rel="noopener noreferrer">
                        <FaInstagram
                            size={24}
                            className="bg-white text-black p-1 rounded-full"
                        />
                    </a>
                    <a target="_blank" rel="noopener noreferrer">
                        <FaXTwitter
                            size={24}
                            className="bg-white text-black p-1 rounded-full"
                        />
                    </a>
                    <a target="_blank" rel="noopener noreferrer">
                        <LuFacebook
                            size={24}
                            className="bg-white text-black p-1 rounded-full"
                        />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
