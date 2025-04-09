import { createContext, useContext, useState, useEffect, useRef } from "react";
import { useNotification } from "./NotificationContext";
import { useAuth } from "./AuthContext";
import { db } from "../firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { showNotification } = useNotification();

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find(
        (item) => item.id === product.id && item.imageUrl === product.imageUrl
      );

      if (existing) {
        showNotification("Antalet har uppdaterats i kundvagnen.");
        return prevCart.map((item) =>
          item.id === product.id && item.imageUrl === product.imageUrl
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        showNotification("Producten har lagts till i kundvagnen.");
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const { user } = useAuth();

  // ladda in användarens sparade kundvagn
  useEffect(() => {
    const loadCartFromFirestore = async () => {
      if (!user) return;
      try {
        const docRef = doc(db, "carts", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setCart(data.items || []);
        }
      } catch (err) {
        console.error("Kunde inte ladda kundvagn:", err);
      }
    };
    loadCartFromFirestore();
  }, [user]);

  // spara kundvagnen i firestore
  const previousUseRef = useRef(user); //förhindra att spara en tom [] vid utloggning.
  useEffect(() => {
    if (user && previousUseRef.current) {
      const saveCartToFirestore = async () => {
        try {
          await setDoc(doc(db, "carts", user.uid), { items: cart });
        } catch (err) {
          console.error("Kunde inte spara kundvagn:", err);
        }
      };
      saveCartToFirestore();
    }
    previousUseRef.current = user;
  }, [cart, user]);

  //töm kundvagn vid utloggning
  useEffect(() => {
    if (!user) setCart([]);
  }, [user]);

  const updateQuantity = (id, imageUrl, newQuantity) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id && item.imageUrl === imageUrl
            ? { ...item, quantity: newQuantity }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id, imageUrl) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item.id === id && item.imageUrl === imageUrl))
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
