import { createContext, useContext, useState } from "react";
import { useNotification } from "./NotificationContext";

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
