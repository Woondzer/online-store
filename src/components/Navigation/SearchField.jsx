import { useEffect, useState, useRef } from "react";
import { useProducts } from "../../contexts/ProductsContext";
import { useGames } from "../../contexts/GamesContext";
import { useIcons } from "../../contexts/IconContext";
import { useNavigate } from "react-router-dom";

const SearchField = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const { products } = useProducts();
  const { games } = useGames();
  const icons = useIcons();
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  // fokuserar på input vid sök aktivering
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  //stäng sök samt dropdown vid klick utanför
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsSearchOpen(false);
        setSearchTerm("");
        setResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // debounce for att inte spamma apianrop
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.length > 0) {
        const lower = searchTerm.toLowerCase();

        const matchedProducts = products.filter((p) =>
          p.title.toLowerCase().includes(lower)
        );

        const matchedGames = games.filter((g) =>
          g.title.toLowerCase().includes(lower)
        );

        setResults([...matchedProducts, ...matchedGames]);
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, products, games]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && results.length > 0) {
      const first = results[0];
      navigate(`/product/${first.id}`);
      setIsSearchOpen(false);
      setSearchTerm("");
      setResults([]);
    }
  };

  return (
    <div className="relative flex item-center" ref={containerRef}>
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
        ref={inputRef}
        placeholder="Sök..."
        className={`absolute right-10 top-1/2 transform -translate-y-1/2 bg-gray-200 text-black px-4 py-2 rounded-lg outline-none transition-all duration-300 ${
          isSearchOpen ? "w-110 opacity-100" : "w-0 opacity-0"
        }`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      {results.length > 0 && (
        <ul className="absolute top-12 right-0 bg-white text-black rounded-lg shadow-lg max-h-96 overflow-y-auto w-[640px] whitespace-nowrap z-50">
          {results.map((item, index) => (
            <li
              key={index}
              className="flex items-center justify-between gap-4 px-4 py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-300"
              onClick={() => {
                // TODO: redirect to details page if needed
                navigate(`/product/${item.id}`);
                setIsSearchOpen(false);
                setSearchTerm("");
              }}
            >
              {/* bild */}
              <div className="w-20 h-16 flex items-center justify-center shrink-0">
                <img
                  src={item.imageUrl}
                  alt="product image"
                  className="h-12 w-auto"
                />
              </div>
              {/* titel + subtitel */}
              <div className="flex flex-col flex-grow">
                <section className="font-bold text-lg">{item.title}</section>
                <section className="text-sm text-gray-500">
                  {item.subtitle}
                </section>
              </div>
              {/* lager + ikon */}
              {/* pris */}
              <div className="flex flex-col items-end min-w-[90px]">
                <div className="text-right text-lg text-orange-600 font-bold min-w-[80px]">
                  {item.price.toLocaleString("sv-SE")} kr
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <span className="text-xs">Webblager:</span>
                  <img
                    src={item.stock > 0 ? icons.check : icons.cross}
                    alt="Lagerstatus"
                    className="w-3 h-3"
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchField;
