import React from "react";
import { Link } from "react-router-dom";
import Carrito from "./Carrito.jsx";
import { useCart } from "../context/logicform.jsx";
import { useProducts } from "../context/ProductsContext.jsx";


const Navbar = () => {
  // Lee estado y acciones del carrito
  const { cart, cartCount, clearCart } = useCart();
  const { discountStock } = useProducts();


  const handleBuy = () => {
  if (cart.length === 0) return;

  const confirm = window.confirm("¿Confirmas la compra? Se descontará el stock.");
  if (!confirm) return;

  discountStock(cart);
  clearCart();
};


  return (
    <nav className="navbar navbar-expand-lg navbar-pastel shadow-sm">
      <div className="container">
        {/* Logo -> Inicio */}
        <Link className="navbar-brand fw-bold" to="/">
          <i className="bi bi-cake2 me-1"></i> Pastelería
        </Link>

        {/* Botón hamburguesa (mobile) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navPasteleria"
          aria-controls="navPasteleria"
          aria-expanded="false"
          aria-label="Abrir menú"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navPasteleria">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Inicio
              </Link>
            </li>

            
            <li className="nav-item">
              <a className="nav-link" href="/#ProdDestacados">
                Productos Destacados
              </a>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/productos">
                Productos
              </Link>
            </li>
            

            {/* Dropdown contacto */}
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Contacto
              </Link>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <Link className="dropdown-item" to="/contacto">
                    <i className="bi bi-envelope me-2"></i>Correo
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin">
                Admin
              </Link>
            </li>

            
            <li className="nav-item ms-lg-3">
              <button
                className="btn btn-primary position-relative"
                data-bs-toggle="modal"
                data-bs-target="#cartModal"
                type="button"
              >
                🎂{" "}
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartCount /* suma total de qty */}
                </span>
              </button>
            </li>
          </ul>

          {/* Modal Carrito */}
          <div
            className="modal fade"
            id="cartModal"
            tabIndex={-1}
            aria-labelledby="cartModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title fw-bold" id="cartModalLabel">
                    Tu Carrito
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Cerrar"
                  ></button>
                </div>

                <div className="modal-body">
                  {/* Componente que lista items, subtotal, total */}
                  <Carrito />
                </div>

                <div className="modal-footer">
                  {/* Vaciar carrito */}
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={clearCart}
                    disabled={cart.length === 0}
                  >
                    Vaciar
                  </button>

                  
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleBuy}
                    disabled={cart.length === 0}
                    data-bs-dismiss="modal"
                  >
                    Comprar
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
