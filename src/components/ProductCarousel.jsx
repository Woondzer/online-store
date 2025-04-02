import { useState, useEffect, useRef } from "react";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../firebaseConfig";
import GoToProductButton from "./GoToProductBTN";

const ProductCarousel = ({ folder }) => {
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
    const fetchImages = async () => {
      try {
        const folderRef = ref(storage, folder);
        const result = await listAll(folderRef);

        const fetchedItems = await Promise.all(
          result.items.map(async (itemRef) => {
            const url = await getDownloadURL(itemRef);
            return {
              imageUrl: url,
            };
          })
        );

        setItems(fetchedItems);
      } catch (error) {
        console.error("Kunde inte hämta bilder från mapp:", folder, error);
      }
    };

    fetchImages();
  }, [folder]);

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

  const currentItem = items[index];

  return (
    <div className="relative w-full h-[450px] overflow-hidden mb-10 rounded-xl">
      <div className="relative w-full h-full">
        <img
          src={currentItem.imageUrl}
          alt="Produktbild"
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        />
        <div className="absolute bottom-10 left-10">
          <GoToProductButton
            productId={currentItem.id}
            label="Till Produkt"
            className="w-80"
          />
        </div>
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
