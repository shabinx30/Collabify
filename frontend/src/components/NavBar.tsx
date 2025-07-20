import { FiSearch } from "react-icons/fi";

const NavBar = () => {
    return (
        <nav className="bg-white text-black">
            <ul className="flex py-2 justify-between px-4">
                <li className="flex-1 font-bold my-1 text-2xl">Logo</li>
                <li className="hidden md:flex flex-1 items-center px-2 border rounded-lg">
                    <FiSearch />
                    <input type="text" className="w-full px-2 h-full outline-none" placeholder="Search"/>
                </li>
                <li className="flex-1 flex justify-end gap-6 my-1">
                    <p>Login</p>
                    <p>Join as Brand</p>
                    <p className="text-[#FFBF00]">Join as Creator</p>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
