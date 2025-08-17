import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import { LuFacebook } from "react-icons/lu";

const Footer = () => {
    return (
        <footer className="bg-[#202020] dark:bg-black p-4">
            <div className="flex py-[2em]">
                <div className="flex flex-1 justify-center">
                    <h3 className="text-xl text-white my-[2em] font-bold">Logo</h3>
                </div>
                <div className="flex-1/2 flex gap-4 text-sm justify-around items-center">
                    <div className="flex flex-col gap-2">
                        <p>About Us</p>
                        <p>Signin</p>
                        <p>SignUp</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p>Search for influencers</p>
                        <p>Search for brands by category</p>
                        <p>Search for brands</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p>Search for influencers</p>
                        <p>Search for brands by category</p>
                        <p>Search for brands</p>
                    </div>
                </div>
            </div>
            <div className="flex justify-center gap-4 items-center">
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
