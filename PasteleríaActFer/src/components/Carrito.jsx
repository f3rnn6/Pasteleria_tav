import React from "react";
import { useCart } from "../context/logicform.jsx";

// Formatea números a estilo CL (miles con punto, etc.)
const money = (n) => Number(n || 0).toLocaleString("es-CL");

const Carrito = () => {
  // Se trae el carrito y funciones desde el context
  const { cart, cartTotal, removeFromCart, increaseQty, decreaseQty } = useCart();

  // Si no hay items, muestra mensaje
  if (cart.length === 0) {
    return <div className="text-center text-muted py-4">Tu carrito está vacío.</div>;
  }

  return (
    <>
      <ul className="list-group mb-3">
        {cart.map((item) => (
          <li key={item.id} className="list-group-item d-flex align-items-center gap-3">
            {/* Imagen del producto */}
            <img
              src={item.imageCard}
              alt={item.name}
              style={{ width: 56, height: 56, objectFit: "cover", borderRadius: 10 }}
            />

            {/* Nombre y precio unitario */}
            <div className="flex-grow-1">
              <div className="fw-semibold">{item.name}</div>
              <small className="text-muted">${money(item.price)} c/u</small>
            </div>

            {/* Controles de cantidad */}
            <div className="d-flex align-items-center gap-2">
              <button className="btn btn-outline-secondary btn-sm" onClick={() => decreaseQty(item.id)}>
                −
              </button>
              <span className="fw-bold">{item.qty}</span>
              <button className="btn btn-outline-secondary btn-sm" onClick={() => increaseQty(item.id)}>
                +
              </button>
            </div>

            {/* Eliminar item */}
            <button
              className="btn btn-outline-danger btn-sm ms-2"
              onClick={() => removeFromCart(item.id)}
              title="Eliminar"
            >
              <i className="bi bi-trash"></i>
            </button>

            {/* Subtotal por producto */}
            <div className="text-end ms-2" style={{ minWidth: 90 }}>
              <div className="fw-semibold">${money(item.price * item.qty)}</div>
              <small className="text-muted">Subtotal</small>
            </div>
          </li>
        ))}
      </ul>

      {/* Total general */}
      <div className="d-flex justify-content-between fw-bold fs-5">
        <span>Total:</span>
        <span>${money(cartTotal)}</span>
      </div>
    </>
  );
};

export default Carrito;
