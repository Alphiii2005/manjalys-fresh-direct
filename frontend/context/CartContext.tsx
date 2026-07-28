"use client";

import { createContext, useContext, useState } from "react";


const CartContext = createContext<any>(null);


export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [cart, setCart] = useState<any[]>([]);


  function addToCart(product: any) {

    setCart((currentCart) => {

      const existing = currentCart.find(
        item => item.id === product.id
      );


      if (existing) {

        return currentCart.map(item =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 0.5
              }
            : item
        );

      }


      return [
        ...currentCart,
        {
          ...product,
          quantity: 0.5
        }
      ];

    });

  }


  function increaseQuantity(productId: number) {

    setCart((currentCart) =>
      currentCart.map(item =>
        item.id === productId
          ? {
              ...item,
              quantity: item.quantity + 0.5
            }
          : item
      )
    );

  }


  function decreaseQuantity(productId: number) {

    setCart((currentCart) =>
      currentCart
        .map(item =>
          item.id === productId
            ? {
                ...item,
                quantity: item.quantity - 0.5
              }
            : item
        )
        .filter(item => item.quantity > 0)
    );

  }


  function removeFromCart(productId: number) {

    setCart((currentCart) =>
      currentCart.filter(
        item => item.id !== productId
      )
    );

  }


  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}


export function useCart() {
  return useContext(CartContext);
}