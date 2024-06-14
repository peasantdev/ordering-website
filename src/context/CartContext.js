import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const itemIndex = prevCart.findIndex((cartItem) => cartItem._id === item._id);
      if (itemIndex > -1) {
        // Update the quantity if the item already exists in the cart
        const updatedCart = [...prevCart];
        updatedCart[itemIndex].quantity += item.quantity;
        return updatedCart;
      } else {
        return [...prevCart, item];
      }
    });
  };

  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};




