import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import Navbar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
import Inicio from "./pages/Inicio.jsx";
import Productos from "./pages/Productos.jsx";
import Contacto from "./pages/Contacto.jsx";
import Admin from "./pages/Admin.jsx";
import { ContactProvider } from "./context/ContactContext.jsx";
import { ProductsProvider } from "./context/ProductsContext.jsx";
import { CartProvider } from "./context/logicform.jsx";

function App() {
  return (
    <Router>
      <ContactProvider>
        <ProductsProvider>
          <CartProvider>
            <div className="d-flex flex-column min-vh-100">
              <Navbar />

              <main className="flex-grow-1">
                <div className="app-container">
                  <Routes>
                    <Route path="/" element={<Inicio />} />
                    <Route path="/productos" element={<Productos />} />
                    <Route path="/contacto" element={<Contacto />} />
                    <Route path="/admin" element={<Admin />} />
                  </Routes>
                </div>
              </main>

              <Footer />
            </div>
          </CartProvider>
        </ProductsProvider>
      </ContactProvider>
    </Router>
  );
}

export default App;
