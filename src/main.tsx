import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import App from "./App.tsx";
import "./index.css";

// Extender Window para incluir __REACT_DEVTOOLS_GLOBAL_HOOK__
declare global {
  interface Window {
    __REACT_DEVTOOLS_GLOBAL_HOOK__: any;
  }
}

// Render the app in a web worker if available (for improved performance)
const root = document.getElementById("root");

if (root) {
  // Desactivar React DevTools en producción para mejorar el rendimiento
  if (process.env.NODE_ENV === "production") {
    if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === "object") {
      for (let [key, value] of Object.entries(
        window.__REACT_DEVTOOLS_GLOBAL_HOOK__
      )) {
        window.__REACT_DEVTOOLS_GLOBAL_HOOK__[key] =
          typeof value === "function" ? () => {} : null;
      }
    }
  }

  // Utilizar StrictMode en desarrollo pero no en producción para mejorar rendimiento
  if (process.env.NODE_ENV === "development") {
    createRoot(root).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  } else {
    createRoot(root).render(<App />);
  }
}
