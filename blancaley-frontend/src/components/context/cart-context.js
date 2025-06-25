"use client";

import { createContext, useContext, useState, useEffect } from "react";
import {
  fetchCart,
  addItemToCart,
  removeItemFromCart,
  updateCartItem,
  clearCartBackend,
} from "@/services/cart-service";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [cartToken, setCartToken] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      let token = localStorage.getItem("cartToken");
      if (!token) {
        token = crypto.randomUUID();
        localStorage.setItem("cartToken", token);
      }
      setCartToken(token);
      fetchCart(token)
      .then((items) => {
        console.log("Carrito persistente cargado:", items);
        setCartItems(items);
      })
      .catch(console.error);    }
  }, []);  

  const total = cartItems.reduce(
    (total, item) => total + item.productPrice * item.quantity,
    0
  );

  const clearCart = async () => {
    setCartItems([]);
    if (cartToken) await clearCartBackend(cartToken);
  };

  const addToCart = async (product) => {
    const existing = cartItems.find(item => item.productId === product.productId);
    const newQuantity = existing ? existing.quantity + 1 : 1;

    const updatedCart = existing
      ? cartItems.map(item =>
          item.productId === product.productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      : [...cartItems, { ...product, quantity: 1 }];

    setCartItems(updatedCart);
    await addItemToCart(cartToken, product.productId, 1);
  };

  const removeFromCart = async (productId) => {
    setCartItems((prev) => prev.filter((item) => item.productId !== productId));
    await removeItemFromCart(cartToken, productId);
  };

  const updateQuantity = async (productId, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
    await updateCartItem(cartToken, productId, quantity);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}