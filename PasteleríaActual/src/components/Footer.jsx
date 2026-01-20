import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-auto">
      <div className="container py-4">
        <div className="row g-3 align-items-center">
          <div className="col-md-6">
            <div className="fw-semibold fs-5">Pastelería</div>
            <div className="d-flex flex-column">
                <small className="text-white-50">Hecho con cariño • 2026</small>
                <small className="text-white-50">
                    <i className="bi bi-geo-alt-fill me-1"></i>
                    Coiron 588, Viña del Mar 📍
                </small>
            </div>
          </div>

          <div className="col-md-6 text-md-end">
            <Link className="text-white-50 text-decoration-none me-3 hover-white" to="/">
              Inicio
            </Link>
            <Link className="text-white-50 text-decoration-none me-3 hover-white" to="/productos">
              Productos
            </Link>
            <Link className="text-white-50 text-decoration-none hover-white" to="/contacto">
              Contacto
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;