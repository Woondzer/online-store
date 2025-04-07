import { useState, useEffect, useRef } from "react";
import { useImages } from "../contexts/CarouselContext";
import { NavLink } from "react-router-dom";
import { useProducts } from "../contexts/ProductsContext";

const ProductCarousel = ({ folder }) => {
  const { fetchFolderImages } = useImages();
  const { isLoaded: productsLoaded } = useProducts();

  const [items, setItems] = useState([]);
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const timeoutRef = useRef(null);

  const delay = 6500;
  const pauseAfterInteraction = 8000;

  const resetTimer = (customDelay = delay) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
        setFade(true);
      }, 300);
    }, customDelay);
  };

  useEffect(() => {
    if (!productsLoaded) return;

    const loadImages = async () => {
      const images = await fetchFolderImages(folder);
      setItems(images);
    };

    loadImages();
  }, [folder, fetchFolderImages, productsLoaded]);

  useEffect(() => {
    if (items.length > 0) {
      resetTimer();
    }
    return () => clearTimeout(timeoutRef.current);
  }, [index, items]);

  const handlePrev = () => {
    setFade(false);
    setTimeout(() => {
      setIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
      setFade(true);
    }, 300);
    resetTimer(pauseAfterInteraction);
  };

  const handleNext = () => {
    setFade(false);
    setTimeout(() => {
      setIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
      setFade(true);
    }, 300);
    resetTimer(pauseAfterInteraction);
  };

  if (items.length === 0) return null;

  //plocka ut vr2STARTPAGE.png för att kunna styla bilden sepparat.
  const currentItem = items[index];
  const imageUrl = currentItem.imageUrl;
  const decodedUrl = decodeURIComponent(imageUrl || "");
  const imageName = decodedUrl.split("/").pop()?.split("?")[0];
  const linkPath = currentItem.id ? `/product/${currentItem.id}` : "#";

  return (
    <div className="relative w-full h-[450px] overflow-hidden mb-10">
      <div className="relative w-full h-full">
        <NavLink to={linkPath}>
          <img
            src={currentItem.imageUrl}
            alt="Produktbild"
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
              fade ? "opacity-100" : "opacity-0"
            } ${
              imageName === "VR2-STARTPAGE.png"
                ? "object-cover object-right"
                : "object-cover object-center"
            }`}
          />
        </NavLink>
        {imageName === "VR2-STARTPAGE.png" && (
          <div className="hidden xl:block absolute left-30 top-1/2 -translate-y-1/2 text-black text-6xl font-bold  px-6 py-3 rounded-lg">
            PlayStation VR2
          </div>
        )}
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-white text-black hover:bg-orange-500 hover:text-white cursor-pointer rounded-full w-10 h-10 flex items-center justify-center shadow-md"
        >
          ❮
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-white text-black hover:bg-orange-500 hover:text-white cursor-pointer rounded-full w-10 h-10 flex items-center justify-center shadow-md"
        >
          ❯
        </button>
      </div>
    </div>
  );
};

export default ProductCarousel;
