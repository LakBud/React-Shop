import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { FilterProvider } from "./components/context/FilterContext.tsx";
import "./App.scss";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FilterProvider>
      <BrowserRouter basename="/React-Shop/">
        <App />
      </BrowserRouter>
    </FilterProvider>
  </StrictMode>
);
