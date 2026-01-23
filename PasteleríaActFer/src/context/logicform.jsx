import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Agrega un producto al carrito respetando stock
  const addToCart = (product, qty = 1) => {
    const productStock = Number(product.stock ?? 0);

    // Si no hay stock, no agregar
    if (productStock <= 0) return;

    setCart((prev) => {
      const found = prev.find((i) => i.id === product.id);
      const currentQty = found ? Number(found.qty ?? 0) : 0;

      // Cuánto puedo agregar sin pasar el stock
      const canAdd = Math.min(Number(qty ?? 1), productStock - currentQty);
      if (canAdd <= 0) return prev;

      // Si ya está, suma pero sin pasar stock
      if (found) {
        return prev.map((i) =>
          i.id === product.id
            ? {
                ...i,
                stock: productStock, // actualiza stock “conocido”
                qty: i.qty + canAdd,
              }
            : i
        );
      }

      // Si no está, lo agrega
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          imageCard: product.imageCard,
          stock: productStock,
          qty: canAdd,
        },
      ];
    });
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((i) => i.id !== id));

  // Sube +1 sin pasar stock guardado en el item
  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((i) => {
        if (i.id !== id) return i;

        const maxStock = Number(i.stock ?? 0);
        if (maxStock <= 0) return i;

        // No pasar stock
        if (i.qty >= maxStock) return i;

        return { ...i, qty: i.qty + 1 };
      })
    );
  };

  // Baja -1 (si llega a 0, elimina)
  const decreaseQty = (id) => {
    setCart((prev) =>
      prev.flatMap((i) => {
        if (i.id !== id) return [i];
        const newQty = i.qty - 1;
        return newQty <= 0 ? [] : [{ ...i, qty: newQty }];
      })
    );
  };

  const clearCart = () => setCart([]);

  const cartCount = useMemo(() => cart.reduce((acc, i) => acc + i.qty, 0), [cart]);

  const cartTotal = useMemo(() => cart.reduce((acc, i) => acc + i.price * i.qty, 0), [cart]);

  return (
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

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>.");
  return ctx;
};
