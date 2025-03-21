import { useState } from "react";

const SearchField = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="relative flex item-center">
      <button
        className="btn btn-ghost btn-circle"
        onClick={() => setIsSearchOpen(!isSearchOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-white hover:text-orange-400 transition-all duration-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="3"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>

      <input
        type="text"
        placeholder="Sök..."
        className={`absolute right-10 top-1/2 transform -translate-y-1/2 bg-gray-200 text-black px-4 py-2 rounded-lg outline-none transition-all duration-300 ${
          isSearchOpen ? "w-110 opacity-100" : "w-0 opacity-0"
        }`}
        autoFocus={isSearchOpen}
      />
    </div>
  );
};

export default SearchField;
