"use client";

import { getCookie, hasCookie, setCookie } from "cookies-next";

export const getCookieCart = (): { [id: string]: number } => {
  if (!hasCookie("cart")) return {};
  const cookieCart = JSON.parse((getCookie("cart") as string) ?? "{}");
  return cookieCart;
};

export const addProductToCart = (id: string) => {
  const cookieCart = getCookieCart();
  if (cookieCart[id]) cookieCart[id] = cookieCart[id] + 1;
  else cookieCart[id] = 1;
  setCookie("cart", cookieCart);
};

export const removeProductFormCart = (id: string) => {
  const cookieCart = getCookieCart();
  if (cookieCart[id]) delete cookieCart[id];
  setCookie("cart", cookieCart);
};

export const removeSingleItemFromCart = (id: string) => {
  const cookieCart = getCookieCart();
  if (!cookieCart[id]) return;
  const newValue = cookieCart[id] - 1;
  if (newValue === 0) delete cookieCart[id];
  else cookieCart[id] = newValue;
  setCookie("cart", cookieCart);
};
