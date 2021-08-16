import { STORAGE_KEY } from "./constants";
import { Product, CartItem } from "./types";
import { useState, useMemo, useEffect } from "react";

export const addProductToCart = (product: Product): void => {
  const cartItems: CartItem[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  const item = cartItems.find((item) => item.product.id === product.id);

  if (item) {
    item.quantity++;
  } else {
    cartItems.push({ product, quantity: 1 });
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
};

export const sumCartItemsCount = (): number => {
  const cartItems: CartItem[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  return cartItems.reduce((sum, item) => sum + item.quantity, 0);
};

export const useCartItems = (): { cartItems: CartItem[]; amount: number } => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const amount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [cartItems]);

  useEffect(() => {
    setCartItems(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"));
  }, []);

  return { cartItems, amount };
};
