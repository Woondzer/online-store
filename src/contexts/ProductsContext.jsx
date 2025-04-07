import { createContext, useContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { db, storage } from "../firebaseConfig";

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchProductsWithImages = async () => {
      const cached = sessionStorage.getItem("productsData");
      if (cached) {
        setProducts(JSON.parse(cached));
        return;
      }

      const productsCollection = collection(db, "products");
      const snapshot = await getDocs(productsCollection);

      const productsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const productsWithImages = await Promise.all(
        productsList.map(async (product) => {
          try {
            const imageRef = ref(storage, `PRODUCTS/${product.imageUrl}`);
            const url = await getDownloadURL(imageRef);
            return {
              ...product,
              imageUrl: url,
              STARTimageUrl: product.STARTimageUrl || null,
            };
          } catch (error) {
            console.error(`kunde inte ladda bild för ${product.title}:`, error);
            return {
              ...product,
              imageUrl: "",
              STARTimageUrl: product.STARTimageUrl || null,
            };
          }
        })
      );

      sessionStorage.setItem(
        "productsData",
        JSON.stringify(productsWithImages)
      );
      setProducts(productsWithImages);
      setIsLoaded(true);
    };

    fetchProductsWithImages();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, isLoaded }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
