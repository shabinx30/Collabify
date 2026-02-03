import Link from "next/link";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import { LuFacebook } from "react-icons/lu";

const Footer = () => {
    return (
        <footer className="bg-black p-4 sm:p-6 md:p-8">
            <div className="flex flex-col md:flex-row py-6 md:py-8 lg:py-12 gap-8 md:gap-4">
                {/* Logo Section */}
                <div className="flex flex-1 justify-center md:justify-start">
                    <Link href="/">
                        <h3 className="text-lg sm:text-xl md:text-2xl my-0 md:my-8 font-bold text-white">Collabify</h3>
                    </Link>
                </div>
                
                {/* Links Section */}
                <div className="text-white flex-1 flex flex-col sm:flex-row gap-6 sm:gap-4 md:gap-6 lg:gap-8 text-xs sm:text-sm justify-center md:justify-around items-start sm:items-center">
                    <div className="flex flex-col gap-2 sm:gap-3">
                        <p className="font-semibold mb-1">Quick Links</p>
                        <p className="hover:text-gray-400 cursor-pointer">About Us</p>
                        <p className="hover:text-gray-400 cursor-pointer">Signin</p>
                        <p className="hover:text-gray-400 cursor-pointer">SignUp</p>
                    </div>
                    <div className="flex flex-col gap-2 sm:gap-3">
                        <p className="font-semibold mb-1">Search</p>
                        <p className="hover:text-gray-400 cursor-pointer">Search for influencers</p>
                        <p className="hover:text-gray-400 cursor-pointer">Search for brands by category</p>
                        <p className="hover:text-gray-400 cursor-pointer">Search for brands</p>
                    </div>
                    <div className="flex flex-col gap-2 sm:gap-3">
                        <p className="font-semibold mb-1">Resources</p>
                        <p className="hover:text-gray-400 cursor-pointer">Help Center</p>
                        <p className="hover:text-gray-400 cursor-pointer">Contact Us</p>
                        <p className="hover:text-gray-400 cursor-pointer">Privacy Policy</p>
                    </div>
                </div>
            </div>
            
            {/* Bottom Section */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-4 items-center pt-4 border-t border-gray-400">
                <p className="text-xs sm:text-sm text-gray-400 text-center sm:text-left">
                    All right reserved &copy; 2025
                </p>
                <div className="flex gap-3 sm:gap-2">
                    <a 
                        href="#" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="transition-transform hover:scale-110"
                        aria-label="Instagram"
                    >
                        <FaInstagram
                            size={20}
                            className="sm:w-6 sm:h-6 bg-white text-black p-1 rounded-full"
                        />
                    </a>
                    <a 
                        href="#" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="transition-transform hover:scale-110"
                        aria-label="Twitter"
                    >
                        <FaXTwitter
                            size={20}
                            className="sm:w-6 sm:h-6 bg-white text-black p-1 rounded-full"
                        />
                    </a>
                    <a 
                        href="#" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="transition-transform hover:scale-110"
                        aria-label="Facebook"
                    >
                        <LuFacebook
                            size={20}
                            className="sm:w-6 sm:h-6 bg-white text-black p-1 rounded-full"
                        />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
