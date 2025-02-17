"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  MagnifyingGlassCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { MicrophoneIcon } from "@heroicons/react/24/solid";

export default function Search() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="">
        <div className="flex items-center justify-center gap-3">
          <div className="group flex items-center">
            <div className="flex h-9 md:ml-10 md:pl-5 border border-gray-300 rounded-l-3xl group-focus-within:border-black md:group-focus-within:ml-5 md:group-focus-within:pl-0 ">
              <div className="w-10 justify-center items-center hidden group-focus-within:md:flex">
                <MagnifyingGlassIcon className="size-4" />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
                className="w-44 px-5 bg-transparent outline-none text-black dark:text-white md:pl-0 md:group-focus-within:pl-0 md:w-64 lg:w-[500px]"
              />
            </div>
            <button
              type="submit"
              className="w-[40px] md:w-[60px] h-8 md:h-9 flex items-center justify-center border border-l-0 border-gray-300 rounded-r-3xl bg-gray-100 hover:bg-gray-200"
            >
              <MagnifyingGlassIcon className="size-5" />
            </button>
          </div>
          <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
            <MicrophoneIcon className="size-5"></MicrophoneIcon>
          </button>
        </div>
      </form>
    </div>
  );
}
