import { useEffect, useState } from "react";
import { useFilter } from "../context/FilterContext";
import "./sideBar.scss";

const Sidebar = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    setKeyword,
  } = useFilter();

  const [categories, setCategories] = useState<string[]>([]);
  const [keywords] = useState<string[]>(["Apple", "Watch", "Fashion", "Trend", "Shoes", "Shirt"]);
  const [isOpen, setIsOpen] = useState<boolean>(true);

  // Hide sidebar by default on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    handleResize(); // run on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products");
        const data: { products: { category: string }[] } = await res.json();

        // Make sure we are working with strings
        const uniqueCategories: string[] = Array.from(new Set(data.products.map((p) => p.category)));

        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error Fetching Data", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <>
      {/* Toggle button for small screens */}
      <button className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "Hide Filters" : "Show Filters"}
      </button>

      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <h1>⚡ React Store ⚡</h1>

        <input type="text" placeholder="Search Product" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />

        <div className="price-inputs">
          <input
            type="number"
            placeholder="Min"
            value={minPrice ?? ""}
            onChange={(e) => setMinPrice(e.target.value ? parseFloat(e.target.value) : undefined)}
          />
          <input
            type="number"
            placeholder="Max"
            value={maxPrice ?? ""}
            onChange={(e) => setMaxPrice(e.target.value ? parseFloat(e.target.value) : undefined)}
          />
        </div>

        <div className="categories">
          <h2 className="section-title">Categories</h2>
          {categories.map((category, index) => (
            <label key={index}>
              <input
                type="radio"
                name="category"
                value={category}
                onChange={() => setSelectedCategory(category)}
                checked={selectedCategory === category}
              />
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </label>
          ))}
        </div>

        <div className="keywords">
          <h2 className="section-title">Keywords</h2>
          {keywords.map((keyword, index) => (
            <button key={index} onClick={() => setKeyword(keyword)}>
              {keyword.charAt(0).toUpperCase() + keyword.slice(1)}
            </button>
          ))}
        </div>

        <button
          className="reset-button"
          onClick={() => {
            setSearchQuery("");
            setSelectedCategory("");
            setMinPrice(undefined);
            setMaxPrice(undefined);
            setKeyword("");
          }}
        >
          Reset Filters
        </button>
      </div>
    </>
  );
};

export default Sidebar;
