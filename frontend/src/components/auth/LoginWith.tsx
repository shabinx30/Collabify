import React from "react";
import { FaFacebookF, FaGoogle } from "react-icons/fa";

const LoginWith = () => {
    return (
        <section className="flex gap-2">
            <div className="flex flex-1 justify-center p-3 bg-[#3b3b3b] rounded-xl">
                <FaGoogle />
            </div>
            <div className="flex flex-1 justify-center p-3 bg-[#3b3b3b] rounded-xl">
                <FaFacebookF />
            </div>
        </section>
    );
};

export default LoginWith;
