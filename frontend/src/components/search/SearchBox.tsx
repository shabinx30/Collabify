"use client";

import { searchPlaceholders } from "@/const/search";
import { searchCreators } from "@/services";
import { TSearchBox } from "@/types/search.type";
import { useEffect, useRef, useState, ViewTransition } from "react";
import { BsStars } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { useRouter, useSearchParams } from "next/navigation";

const SearchBox = ({
    setCreators,
    isSearched,
    setIsSearched,
    isInSearchPage,
    wrapInView,
}: TSearchBox) => {
    const searchRef = useRef<HTMLTextAreaElement>(null);
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleChange = () => {
        const node = searchRef.current;
        if (!node) return;

        // 1. Reset height to shrink the box
        node.style.height = "auto";

        const computedStyle = window.getComputedStyle(node);
        const lineHeight = parseInt(computedStyle.lineHeight, 10) || 24;
        const paddingTop = parseInt(computedStyle.paddingTop, 10) || 0;
        const paddingBottom = parseInt(computedStyle.paddingBottom, 10) || 0;
        const totalPadding = paddingTop + paddingBottom;

        // 2. Measure content height minus padding
        const pureContentHeight = node.scrollHeight - totalPadding;

        // 3. Determine the row count
        // Use a small buffer (like 2px) to prevent tiny sub-pixel rounding from triggering a new row
        const row = Math.floor((pureContentHeight + 2) / lineHeight);

        let finalHeight = "";
        let overflow = "hidden";

        if (!node.value.trim()) {
            // Force the single-line height when empty
            finalHeight = `${lineHeight + totalPadding}px`;
        } else if (row >= 4) {
            finalHeight = `${lineHeight * 4 + totalPadding}px`;
            overflow = "auto";
        } else {
            // For 1 or 2 rows, use the scrollHeight directly
            finalHeight = `${node.scrollHeight}px`;
        }

        node.style.overflowY = overflow;
        node.style.height = finalHeight;
    };

    const handleSubmitForSearch = async (
        e?: React.FormEvent<HTMLFormElement>,
    ) => {
        e?.preventDefault();
        if (!searchRef.current || !searchRef.current.value.trim()) return;
        const res = await searchCreators(searchRef.current.value);
        console.log({ res });
        if (setCreators) {
            setCreators(() => res);
        }
        if (!isSearched && setIsSearched) {
            setIsSearched(() => true);
        }
    };

    const redirectToSearch = async (e: React.FormEvent<HTMLFormElement>) => {
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
        <Wrapper wrapInView={wrapInView}>
            <div
                className={`searchbox flex w-full ${!isInSearchPage ? "w-[75%] lg:w-[60%]" : ""} justify-between items-center px-3 md:px-6 py-2.5 md:py-3 bg-gray-100 dark:bg-[#2b2b2b] rounded-3xl`}
            >
                <div className="flex items-center gap-1.5 md:gap-3 w-full">
                    <FiSearch size={18} />
                    <form
                        autoComplete="off"
                        onSubmit={redirectToSearch}
                        className="relative w-full overflow-hidden search-container text-xs md:text-base"
                    >
                        <textarea
                            name="search"
                            ref={searchRef}
                            onChange={handleChange}
                            rows={1}
                            className="w-full bg-transparent outline-none resize-none leading-6 pt-1"
                            style={{ overflowY: "hidden" }}
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
                <BsStars size={20} className="text-lime-400 ml-2" />
            </div>
        </Wrapper>
    );
};

const Wrapper = ({
    children,
    wrapInView,
}: {
    children: React.ReactNode;
    wrapInView?: boolean;
}) => {
    return wrapInView ? (
        <ViewTransition name="search-bar">{children}</ViewTransition>
    ) : (
        children
    );
};

export default SearchBox;
