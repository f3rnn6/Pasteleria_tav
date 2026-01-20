import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Punto de entrada: monta React en <div id="root"></div>
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* StrictMode ayuda a detectar problemas en desarrollo */}
    <App />
  </StrictMode>
);
