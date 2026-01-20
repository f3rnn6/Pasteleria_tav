import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

// Contexto: “contenedor global” para compartir el carrito en toda la app
const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  // Estado principal del carrito (array de items)
  const [cart, setCart] = useState(() => {
    try {
      // Carga carrito guardado (si existe)
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Cada vez que cambie el carrito, se guarda en localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Agrega un producto al carrito (si ya existe, suma cantidad)
  const addToCart = (product, qty = 1) => {
    setCart((prev) => {
      const found = prev.find((i) => i.id === product.id);

      // Si ya está, solo aumenta qty
      if (found) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + qty } : i
        );
      }

      // Si no está, lo agrega como nuevo item
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          imageCard: product.imageCard,
          qty,
        },
      ];
    });
  };

  // Elimina un producto completo del carrito
  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((i) => i.id !== id));

  // Sube cantidad en +1
  const increaseQty = (id) =>
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i))
    );

  // Baja cantidad en -1 (si llega a 0, lo elimina)
  const decreaseQty = (id) => {
    setCart((prev) =>
      prev.flatMap((i) => {
        if (i.id !== id) return [i];
        const newQty = i.qty - 1;
        return newQty <= 0 ? [] : [{ ...i, qty: newQty }];
      })
    );
  };

  // Vacía el carrito completo
  const clearCart = () => setCart([]);

  // Total de productos (suma de qty)
  const cartCount = useMemo(
    () => cart.reduce((acc, i) => acc + i.qty, 0),
    [cart]
  );

  // Total de dinero (precio * qty)
  const cartTotal = useMemo(
    () => cart.reduce((acc, i) => acc + i.price * i.qty, 0),
    [cart]
  );

  return (
    // Se expone todo lo necesario a cualquier componente hijo
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook para usar el carrito fácilmente
export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>.");
  return ctx;
};
