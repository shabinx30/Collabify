import AddButton from "@/components/profile/socialAccounts/AddButton";
import { FiPlus } from "react-icons/fi";

const Youtube = () => {
    return (
        <section className="flex justify-center items-center py-[6em]">
            <div className="flex flex-col gap-4 items-center py-8">
                <p className="text-gray-500 text-sm">No account added yet!</p>
                <AddButton className="bg-black dark:bg-white rounded-3xl text-white dark:text-black py-3 pl-4 pr-5 flex items-center gap-1 cursor-pointer">
                    <FiPlus />
                    Add an Youtube account
                </AddButton>
            </div>
        </section>
    );
};

export default Youtube;
