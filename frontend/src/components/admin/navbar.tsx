import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { IoMoon } from "react-icons/io5";

const Navbar = ({
    asideRef,
}: {
    asideRef: React.RefObject<HTMLDetailsElement | null>;
}) => {
    const [asideWidth, setAsideWidth] = useState(0);

    useEffect(() => {
        if (asideRef.current) {
            setAsideWidth(asideRef.current.clientWidth);

            // Optional: listen for resize changes
            const resizeObserver = new ResizeObserver(() => {
                setAsideWidth(asideRef.current?.clientWidth || 0);
            });
            resizeObserver.observe(asideRef.current);

            return () => resizeObserver.disconnect();
        }
    }, [asideRef]);
    return (
        <nav
            className={`flex justify-between backdrop-blur-2xl fixed w-full rounded-2xl py-2`}
            style={{
                width: `calc(100vw - ${asideWidth || 0}px - 57px)`,
            }}
        >
            {/* currun page */}
            <div className="flex items-center pl-6">
                <span className="text-xl font-semibold">Dashboard</span>
            </div>
            <div className="bg-white dark:bg-[#111C44] rounded-full flex gap-2 p-2">
                <div className="bg-[#eae7ff] dark:bg-[#0B1437] px-3.5 py-1 rounded-full flex gap-1 items-center flex-1">
                    <FiSearch />
                    <input
                        type="text"
                        className="rounded-2xl p-1 w-full placeholder:text-white"
                        placeholder="Search..."
                    />
                </div>
                <span className="h-full flex items-center rounded-full p-3">
                    <IoMoon />
                </span>
                <span className="bg-[#eae7ff] dark:bg-[#0B1437] h-full flex items-center rounded-full p-3">
                    <FaRegUser />
                </span>
            </div>
        </nav>
    );
};

export default Navbar;
