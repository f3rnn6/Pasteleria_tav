import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import { ContactProvider } from "../../PasteleríaActFer/src/context/ContactContext.jsx";
import Productos from "./pages/Productos.jsx";
import Navbar from "./components/NavBar.jsx";
import Inicio from "./pages/Inicio.jsx";
import Footer from "./components/Footer.jsx";
import Contacto from "./pages/Contacto.jsx";
import { CartProvider } from "./context/logicform.jsx";

function App() {
  return (
    <Router>
      <ContactProvider>
      {/* Provider: hace que el carrito esté disponible en toda la app */}
        <CartProvider>
          <div className="d-flex flex-column min-vh-100">
            <Navbar />

            {/* Contenido cambia según la ruta */}
                      <main className="flex-grow-1">
              <div className="app-container">
                <Routes>
                  <Route path="/" element={<Inicio />} />
                  <Route path="/productos" element={<Productos />} />
                  <Route path="/contacto" element={<Contacto />} />
                </Routes>
              </div>
            </main>

            <Footer />
          </div>
        </CartProvider>
      </ContactProvider>
      
    </Router>
  );
}
export default App;
