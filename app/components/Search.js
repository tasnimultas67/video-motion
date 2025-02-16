"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
    <form onSubmit={handleSearch} className="mb-8">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search videos..."
        className="px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
      />
      <button
        type="submit"
        className="ml-2 px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition duration-300"
      >
        Search
      </button>
    </form>
  );
}
