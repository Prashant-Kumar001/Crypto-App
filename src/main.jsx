import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ToggleProvider } from "./context/toggle/ToggleContext";
import { CountryProvider } from "./context/country/CountryContext.jsx";
createRoot(document.getElementById("root")).render(
    <CountryProvider>
      <ToggleProvider>
        <App />
      </ToggleProvider>
    </CountryProvider>
);
