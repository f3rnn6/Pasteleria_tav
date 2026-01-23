import React, { createContext, useContext, useEffect, useState } from "react";
import productsData from "../data/Products.json";

const ProductsContext = createContext(null);

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    try {
      const stored = localStorage.getItem("products");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return productsData; // fallback al JSON
  });

  const [loading, setLoading] = useState(true);

  // Marca loading false al montar
  useEffect(() => {
    setLoading(false);
  }, []);

  // Persistencia
  useEffect(() => {
    if (!loading) {
      localStorage.setItem("products", JSON.stringify(products));
    }
  }, [products, loading]);

  // CRUD
  const addProduct = (product) => {
    setProducts((prev) => [...prev, { ...product, id: Date.now() }]);
  };

  const updateProduct = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // Descontar stock al comprar
  const discountStock = (cart) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => {
        const item = cart.find((c) => c.id === product.id);
        if (!item) return product;

        const stock = Number(product.stock ?? 0);
        const qty = Number(item.qty ?? item.quantity ?? 0);

        return {
          ...product,
          stock: Math.max(stock - qty, 0),
        };
      })
    );
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        setProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        discountStock,
        loading,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

// ✅ ESTE EXPORT es el que te está faltando
export const useProducts = () => {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts debe usarse dentro de <ProductsProvider>.");
  return ctx;
};
