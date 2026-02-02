"use client";

import { searchPlaceholders } from "@/const/search";
import { searchCreators } from "@/services";
import { TSearchBox } from "@/types/search.type";
import { useEffect, useRef, ViewTransition } from "react";
import { BsStars } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { useRouter, useSearchParams } from "next/navigation";

const SearchBox = ({ setCreators }: TSearchBox) => {
    const searchRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (searchRef.current) {
            searchRef.current.value = e.target.value;
        }
    };

    const handleSubmitForSearch = async (
        e?: React.FormEvent<HTMLFormElement>,
    ) => {
        e?.preventDefault();
        if (!searchRef.current || !searchRef.current.value.trim()) return;
        const res = await searchCreators(searchRef.current.value);
        if (setCreators) {
            setCreators(() => res);
        }
    };

    const handleSubmitForHome = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (
            !searchRef.current ||
            !searchRef.current.value ||
            !searchRef.current.value.trim()
        )
            return;
        router.push(`/search?query=${searchRef.current.value}`);
    };

    useEffect(() => {
        const query = searchParams.get("query");
        if (searchRef.current) {
            searchRef.current.value = query || "";
        }
        if (query) {
            handleSubmitForSearch();
        }
    }, [searchParams]);

    return (
        <ViewTransition name="search-bar">
            <div className="searchbox flex w-full md:w-[75%] lg:w-[60%] justify-between items-center px-3 md:px-6 py-2.5 md:py-4 bg-gray-100 dark:bg-[#2b2b2b] rounded-3xl">
                <div className="flex items-center gap-1.5 md:gap-3 w-full">
                    <FiSearch size={18} />
                    <form
                        autoComplete="off"
                        onSubmit={
                            setCreators
                                ? handleSubmitForSearch
                                : handleSubmitForHome
                        }
                        className="relative w-full overflow-hidden search-container text-xs md:text-base"
                    >
                        <input
                            type="search"
                            name="search"
                            ref={searchRef}
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
                <BsStars size={20} className="text-lime-400" />
            </div>
        </ViewTransition>
    );
};

export default SearchBox;
