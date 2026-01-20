import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

// 1. Importa el Provider que creamos en el paso anterior
import { ContactProvider } from "./context/ContactContext";

import Productos from "./pages/Productos";
import Navbar from "./components/NavBar.jsx";
import Inicio from "./pages/Inicio.jsx";
import Footer from "./components/Footer.jsx";
import Contacto from "./pages/Contacto.jsx";

function App() {
  const clearCart = () => {
    console.log("Vaciar carrito");
  };



  dick 
  return (
    <Router>
      {/* 2. Envolvemos todo el contenido con el ContactProvider */}
      <ContactProvider>
        <div className="d-flex flex-column min-vh-100">
          <Navbar />
          
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/productos" element={<Productos />} />
              <Route path="/contacto" element={<Contacto />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </ContactProvider>
    </Router>
  );
}

export default App;