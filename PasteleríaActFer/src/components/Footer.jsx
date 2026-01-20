import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-auto">
      <div className="container py-4">
        <div className="row g-3 align-items-center">
          {/* En móvil: ocupa 12 (abajo), en md+: 6 (izquierda) */}
          <div className="col-12 col-md-6 text-center text-md-start">
            <div className="fw-semibold fs-5">Pastelería</div>

            <div className="d-flex flex-column">
              <small className="text-white-50">Hecho con cariño • 2026</small>
              <small className="text-white-50">
                <i className="bi bi-geo-alt-fill me-1"></i>
                Coiron 588, Viña del Mar 📍
              </small>
            </div>
          </div>

          {/* En móvil: centrado y con salto, en md+: alineado a la derecha */}
          <div className="col-12 col-md-6 text-center text-md-end">
            {/* flex-wrap evita que se rompa feo si no cabe */}
            <div className="d-flex justify-content-center justify-content-md-end gap-3 flex-wrap">
              <Link className="text-white-50 text-decoration-none hover-white" to="/">
                Inicio
              </Link>
              <Link className="text-white-50 text-decoration-none hover-white" to="/productos">
                Productos
              </Link>
              <Link className="text-white-50 text-decoration-none hover-white" to="/contacto">
                Contacto
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
