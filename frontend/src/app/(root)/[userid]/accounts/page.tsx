import { FiPlus } from "react-icons/fi";

const Accounts = () => {
    return (
        <main className="p-4">
            <section className="flex-col flex-1">
                <h3 className="text-green-400">Accounts</h3>
                <div className="w-full p-4 bg-gray-100 dark:bg-[#2b2b2b] rounded-2xl">
                    <div className="flex flex-col gap-4 items-center py-8">
                        <p className="text-gray-500 text-sm">
                            No accounts added yet!
                        </p>
                        <button className="bg-black dark:bg-white rounded-3xl text-white dark:text-black py-3 pl-4 pr-5 flex items-center gap-1 cursor-pointer">
                            <FiPlus />
                            Add an account
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Accounts;
