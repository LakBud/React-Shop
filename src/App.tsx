import { Route, Routes, useLocation } from "react-router-dom";
import Sidebar from "./components/SideBar/Sidebar";
import MainContent from "./components/MainContent/MainContent";
import ProductPage from "./components/ProductPage/ProductPage";
import TopSellers from "./components/Sellers/TopSellers";
import PopularBlogs from "./components/Blogs/PopularBlogs";
import "./App.scss";

function App() {
  const location = useLocation();
  const hideUserContainer = location.pathname.startsWith("/product/"); // hide on product pages

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-wrapper">
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>

        {!hideUserContainer && (
          <div className="user-container">
            <TopSellers />
            <PopularBlogs />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
