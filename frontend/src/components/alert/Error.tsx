import { type Toast } from "react-hot-toast";
import { FaRegCircleXmark } from "react-icons/fa6";
import "./alert.css";

const Error = ({ t, message }: { t: Toast; message: string }) => {
    return (
        <div
            className={`${
                t.visible ? "animate-enter" : "animate-leave"
            } text-sm border-2 border-red-400 bg-gray-50 dark:bg-[#1b1b1b] text-red-400 px-4 py-2 rounded-full shadow flex gap-2 items-center`}
        >
            <FaRegCircleXmark/>
            {message}
        </div>
    );
};

export default Error;
