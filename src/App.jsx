import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./main.jsx";

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
