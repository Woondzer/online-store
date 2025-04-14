import { useEffect, useState, useRef } from "react";
import { useProducts } from "../contexts/ProductsContext";
import { useGames } from "../contexts/GamesContext";
import { storage } from "../firebaseConfig";
import { getDownloadURL, ref } from "firebase/storage";
import { NavLink } from "react-router-dom";
import { useIcons } from "../contexts/IconContext";
import StarRating from "./StarRating";

const tabLabels = ["vr-kit", "spelstation", "spel", "tillbehör"];

const PopularTabs = () => {
  const { products } = useProducts();
  const { games } = useGames();
  const [activeTab, setActiveTab] = useState(tabLabels[0]);
  const [productsByCategory, setProductsByCategory] = useState([]);
  const icons = useIcons();

  const tabRefs = useRef([]);
  const wrapperRef = useRef(null);
  const [underline, setUnderline] = useState({ width: 0, offset: 0 });

  // Flyttar underline snyggt
  useEffect(() => {
    const i = tabLabels.indexOf(activeTab);
    const el = tabRefs.current[i];
    const wrapper = wrapperRef.current;

    if (el && wrapper) {
      const { left: elLeft, width } = el.getBoundingClientRect();
      const { left: wrapperLeft } = wrapper.getBoundingClientRect();
      setUnderline({ width, offset: elLeft - wrapperLeft });
    }
  }, [activeTab]);

  // Laddar in top-produkt för varje kategori
  useEffect(() => {
    const fetchTopProducts = async () => {
      const results = await Promise.all(
        tabLabels.map(async (category) => {
          const items =
            category === "spel"
              ? games.filter((g) => g.category === category)
              : products.filter((p) => p.category === category);

          const sorted = items.sort((a, b) => {
            if (b.rating === a.rating) return b.reviews - a.reviews;
            return b.rating - a.rating;
          });

          const top = sorted[0];
          if (!top) return null;

          try {
            const imageRef = ref(storage, top.imageUrl);
            const imageUrl = await getDownloadURL(imageRef);
            return { ...top, imageUrl };
          } catch (err) {
            console.error("Kunde inte hämta bild:", err);
            return null;
          }
        })
      );

      setProductsByCategory(results);
    };

    fetchTopProducts();
  }, [products, games]);

  const handleTabClick = (label) => {
    if (label !== activeTab) {
      setActiveTab(label);
    }
  };

  const activeIndex = tabLabels.indexOf(activeTab);

  return (
    <div className="w-full text-center mt-10">
      <h2 className="text-gray-600 text-3xl font-bold mb-4">
        Populärt just nu!
      </h2>

      {/* Tabs */}
      <div className="flex justify-center">
        <div
          ref={wrapperRef}
          className="relative flex gap-10 border-b border-transparent"
        >
          {tabLabels.map((label, i) => (
            <button
              key={label}
              ref={(el) => (tabRefs.current[i] = el)}
              onClick={() => handleTabClick(label)}
              className={`pb-2 font-bold transition-colors duration-300 hover:cursor-pointer ${
                activeTab === label ? "text-black" : "text-gray-500"
              }`}
            >
              {label.toUpperCase()}
            </button>
          ))}

          {/* Underline */}
          <div
            className="absolute bottom-0 h-[2px] bg-[#FF9900] transition-all duration-300"
            style={{
              width: underline.width,
              transform: `translateX(${underline.offset}px)`,
            }}
          />
        </div>
      </div>

      {/* Karusell-produktvisning */}
      <div className="overflow-hidden mt-8">
        <div
          className="flex transition-transform duration-500"
          style={{
            width: `${tabLabels.length * 100}%`,
            transform: `translateX(-${
              activeIndex * (100 / tabLabels.length)
            }%)`,
          }}
        >
          {productsByCategory.map(
            (product, i) =>
              product && (
                <div
                  key={i}
                  className="w-full flex-shrink-0 px-4 text-black flex justify-center mb-10"
                  style={{ width: `${100 / tabLabels.length}%` }}
                >
                  <div className="p-6 w-full max-w-5xl flex flex-col lg:flex-row items-center rounded-lg shadow-md hover:shadow-lg transition duration-300 bg-white">
                    {/* Bild till vänster */}
                    <div className="w-auto lg:w-1/2 flex justify-center">
                      <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="h-58 w-auto object-contain"
                      />
                    </div>

                    {/* Info till höger */}
                    <div className="w-full lg:w-1/2 text-left max-w-md ml-auto mr-auto">
                      <h2 className="text-2xl font-bold mb-2">
                        {product.title}
                      </h2>
                      <p className="text-gray-600 mb-4">
                        {product.description}
                      </p>
                      <ul className="list-disc list-inside text-sm text-gray-700 mb-4">
                        {product.details?.map((line, idx) => (
                          <li key={idx}>{line}</li>
                        ))}
                      </ul>

                      <div className="flex justify-between items-end mt-10 mb-5">
                        <div className="flex flex-col justify-end">
                          <div className="flex items-center gap-2 mb-1 text-sm">
                            <p>Webblager:</p>
                            <img
                              src={
                                product.stock > 0 ? icons.check : icons.cross
                              }
                              alt="Lagerstatus"
                              className="w-5 h-5"
                            />
                          </div>
                          <div className="flex items-center gap-2 leading-none">
                            <StarRating rating={product.rating} />
                            <span className="text-sm text-gray-500 leading-none">
                              ({product.reviews})
                            </span>
                          </div>
                        </div>

                        {/* Höger sektion – Pris */}
                        <p className="text-3xl font-bold text-orange-600 leading-none">
                          {product.price.toLocaleString("sv-SE")} kr
                        </p>
                      </div>

                      <NavLink
                        to={`/product/${product.id}`}
                        className="btn h-12 bg-[#FF9900] border-none w-full text-black hover:bg-black hover:text-[#FF9900] font-bold"
                      >
                        Till Produkt
                      </NavLink>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default PopularTabs;
