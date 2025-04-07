import { createContext, useContext } from "react";
import { listAll, ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebaseConfig";
import { useGames } from "./GamesContext";
import { useProducts } from "./ProductsContext";

const CarouselContext = createContext();

export const useImages = () => useContext(CarouselContext);

export const ProductCarouselProvider = ({ children }) => {
  const { games } = useGames();
  const { products } = useProducts();

  const fetchFolderImages = async (folderName) => {
    // läser från sessionStorage först
    const cached = sessionStorage.getItem(`images-${folderName}`);
    if (cached) {
      return JSON.parse(cached);
    }

    // Hämtar från Firebase om inte finns
    try {
      const folderRef = ref(storage, folderName);
      const result = await listAll(folderRef);

      const fetchedItems = await Promise.all(
        result.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          const filename = `${folderName}/${itemRef.name}`;

          let matchedGame = games.find((g) => g.BIGimageUrl === filename);
          let matchedProduct = products.find(
            (p) => p.STARTimageUrl === filename
          );

          return {
            imageUrl: url,
            id: matchedGame?.id || matchedProduct?.id || null,
            STARTimageUrl: matchedProduct?.STARTimageUrl || null,
            BIGimageUrl: matchedGame?.BIGimageUrl || null,
          };
        })
      );

      //spara i context och sessionStorage
      sessionStorage.setItem(
        `images-${folderName}`,
        JSON.stringify(fetchedItems)
      );

      return fetchedItems;
    } catch (error) {
      console.error("kunde inte hämta bilder från mapp:", folderName, error);
      return [];
    }
  };

  return (
    <CarouselContext.Provider value={{ fetchFolderImages }}>
      {children}
    </CarouselContext.Provider>
  );
};
