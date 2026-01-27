"use client";

import { searchPlaceholders } from "@/const/search";
import { searchCreators } from "@/services";
import { TSearchBox } from "@/types/search.type";
import { useRef, ViewTransition } from "react";
import { BsStars } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { useRouter } from "next/navigation";

const SearchBox = ({ setCreators }: TSearchBox) => {
    const searchRef = useRef<string | null>(null);
    const router = useRouter();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        searchRef.current = e.target.value;
    };

    const handleSubmitForSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!searchRef.current || !searchRef.current.trim()) return;
        const res = await searchCreators(searchRef.current);
        if (setCreators) {
            setCreators(() => res);
        }
    };

    const handleSubmitForHome = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!searchRef.current || !searchRef.current.trim()) return;
        router.push(`/search?query=${searchRef.current}`);
    };

    return (
        <ViewTransition name="search-bar">
            <div className="flex w-full md:w-[75%] lg:w-[60%] justify-between items-center px-3 md:px-6 py-2.5 md:py-4 border border-[#868686] dark:border-gray-600 bg-gray-100 dark:bg-[#2b2b2b] rounded-3xl">
                <div className="flex items-center gap-1.5 md:gap-3 w-full">
                    <FiSearch size={18} />
                    <form
                        autoComplete="off"
                        onSubmit={setCreators ? handleSubmitForSearch : handleSubmitForHome}
                        className="relative w-full overflow-hidden search-container text-xs md:text-base"
                    >
                        <input
                            type="search"
                            name="search"
                            onChange={handleChange}
                            className="relative w-full outline-none bg-transparent z-2"
                            placeholder="Try"
                        />
                        <div className="placeholder-scroll left-[22px] md:left-[30px]">
                            {searchPlaceholders.map((val, i) => (
                                <div key={i} className="placeholder-item">
                                    {`"${val}"`}
                                </div>
                            ))}
                        </div>
                    </form>
                </div>
                <BsStars size={20} className="text-green-400" />
            </div>
        </ViewTransition>
    );
};

export default SearchBox;
