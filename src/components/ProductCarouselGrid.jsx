import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import { useIcons } from "../contexts/IconContext";
import GoToProductButton from "./GoToProductBTN";
import { NavLink } from "react-router-dom";

const ProductCarouselGrid = ({ title, items }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const icons = useIcons();

  //skärmstorleks anpassning
  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setVisibleCount(1);
      } else if (width < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  //funktionalitet för att gå till höger eller vänster i karusellen.
  const handlePrev = () => {
    const maxStart = Math.max(0, items.length - visibleCount);
    setStartIndex((prev) =>
      prev === 0 ? maxStart : Math.max(prev - visibleCount, 0)
    );
  };

  const handleNext = () => {
    const maxStart = Math.max(0, items.length - visibleCount);
    setStartIndex((prev) =>
      prev >= maxStart ? 0 : Math.min(prev + visibleCount, maxStart)
    );
  };

  const isCarousel = items.length > visibleCount;
  const visibleItems = isCarousel
    ? items.slice(startIndex, startIndex + visibleCount)
    : items;

  return (
    <section className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-center font-bold text-3xl mb-6">{title}</h2>
      <div className="flex items-center justify-between gap-4">
        {isCarousel && (
          <button onClick={handlePrev} className="btn btn-circle">
            ❮
          </button>
        )}

        <div
          className={`grid gap-6 flex-1 ${
            visibleItems.length === 1
              ? "grid-cols-1 place-items-center"
              : visibleItems.length === 2
              ? "grid-cols-2 place-items-center"
              : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
          }`}
        >
          {visibleItems.map((item) => (
            <NavLink to={`/product/${item.id}`} key={item.id}>
              <div
                key={item.id}
                className={`p-6 flex flex-col items-center rounded-lg shadow-md 
                  hover:shadow-lg hover:scale-102 transform transition duration-300
                  ${
                    visibleItems.length === 2
                      ? " shadow-lg w-full max-w-[500px] mx-auto"
                      : "bg-white"
                  }`}
              >
                <img
                  src={item.imageUrl}
                  alt={item.titel}
                  className="w-auto h-32 object-contain mb-4"
                />
                <h2 className="text-lg font-bold text-center">{item.title}</h2>

                <h3 className="text-sm font-extralight mb-2 mt-3">
                  {item.shortDescription}
                </h3>
                <div className="flex items-center justify-between w-full mt-4 items-end">
                  <div>
                    <div className="flex items-center text-sm font-extralight gap-2 mb-1">
                      <span>Webblager:</span>
                      <img
                        src={item.stock > 0 ? icons.check : icons.cross}
                        alt="Lagerstatus"
                        className="w-5 h-auto ml-2"
                      />
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <StarRating rating={item.rating} />

                      <span className="text-gray-600">({item.reviews})</span>
                      {/* <GoToProductButton
                      productId={item.id}
                      label="Till produkt"
                      className="p-0"
                    /> */}
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-orange-600 whitespace-nowrap">
                    {/* för att få space i priset så behövdes toLocalString("sv-SE") */}
                    {item.price.toLocaleString("sv-SE")} kr
                  </p>
                </div>
              </div>
            </NavLink>
          ))}
        </div>

        {isCarousel && (
          <button onClick={handleNext} className="btn btn-circle">
            ❯
          </button>
        )}
      </div>
    </section>
  );
};

export default ProductCarouselGrid;
