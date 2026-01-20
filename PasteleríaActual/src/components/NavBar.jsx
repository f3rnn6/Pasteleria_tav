import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    // Función temporal para que el botón "Vaciar" no de error
    const clearCart = () => {
        console.log("Vaciando carrito...");
        // Aquí irá tu lógica de estado más adelante
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-pastel shadow-sm">
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/">
                    <i className="bi bi-cake2 me-1"></i> Pastelería
                </Link>

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
                            <Link className="nav-link" to="#ofertas">
                                Ofertas
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/productos">
                                Productos
                            </Link>
                        </li>

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

                        <li className="nav-item ms-lg-3">
                            <button
                                className="btn btn-primary position-relative"
                                data-bs-toggle="modal"
                                data-bs-target="#cartModal"
                            >
                                🎂{" "}
                                <span
                                    id="cart-count"
                                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                                >
                                    0
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
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title fw-bold" id="cartModalLabel">
                                        Tu Carrito
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    ></button>
                                </div>

                                <div className="modal-body">
                                    <ul id="cart-items" className="list-group mb-3">
                                        {/* Aquí se cargarán los items */}
                                    </ul>
                                    <div className="d-flex justify-content-between fw-bold fs-5">
                                        <span>Total:</span>
                                        <span>
                                            $<span id="cart-total">0</span>
                                        </span>
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-outline-secondary" onClick={clearCart}>
                                        Vaciar
                                    </button>
                                    <button type="button" className="btn btn-primary">
                                        Finalizar Compra
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Buscador */}
                    <form className="d-flex ms-lg-3 mt-3 mt-lg-0" role="search">
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Buscar productos..."
                            aria-label="Buscar"
                        />
                        <button className="btn btn-search" type="submit">
                            Buscar
                        </button>
                    </form>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;