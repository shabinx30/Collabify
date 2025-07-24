import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";

const NavBar = ({ page }: { page: "login" | "signup" }) => {
    return (
        <nav className="bg-white dark:bg-[#1b1b1b]">
            <ul className="flex py-2 justify-between px-4">
                <li className="flex-1 font-bold my-1 text-lg md:text-2xl">
                    {" "}
                    <Link to="/">Logo</Link>{" "}
                </li>
                <li className="hidden md:flex flex-1 items-center px-4 gap-2 border border-[#868686] dark:border-gray-600 dark:bg-[#2b2b2b] rounded-xl">
                    <FiSearch />
                    <input
                        type="text"
                        className="w-full h-full outline-none"
                        placeholder="Search"
                    />
                </li>
                <li className="flex-1/3 lg:flex-1 flex text-sm lg:text-base justify-end gap-6 my-1">
                    {page != "login" && <Link to="/login">Login</Link>}
                    <Link to="/signup"><p>Join as Brand</p></Link>
                    <Link to="/signup"><p className="text-[#FFBF00]">Join as Creator</p></Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
