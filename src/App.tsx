import { Route, Routes, useLocation } from "react-router-dom";
import Sidebar from "./components/SideBar/Sidebar";
import MainContent from "./components/MainContent/MainContent";
import ProductPage from "./components/ProductPage/ProductPage";
import TopSellers from "./components/Sellers/TopSellers";
import PopularBlogs from "./components/Blogs/PopularBlogs";
import reactLogo from "./assets/React.png"; // Proper asset import
import "./App.scss";

function App() {
  const location = useLocation();
  const hideUserContainer = location.pathname.startsWith("/product/"); // hide on product pages

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content wrapper */}
      <div className="main-wrapper">
        {/* React logo */}
        <img src={reactLogo} alt="React-logo" className="w-[80px]" loading="lazy" />

        {/* Routes */}
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>

        {/* User container (TopSellers + PopularBlogs) */}
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
