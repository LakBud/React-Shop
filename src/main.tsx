import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { FilterProvider } from "./components/context/FilterContext.tsx";
import "./App.scss";
import { HashRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FilterProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </FilterProvider>
  </StrictMode>
);
