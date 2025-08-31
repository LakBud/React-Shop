import { useEffect, useState } from "react";
import { useFilter } from "../context/FilterContext";
import "./sideBar.scss";

interface Product {
  category: string;
}

interface FetchResponse {
  products: Product[];
}

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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products");
        const data: FetchResponse = await res.json();
        const uniqueCategories = Array.from(new Set(data.products.map((product) => product.category)));

        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error Fetchind Data", error);
      }
    };

    fetchCategories();
  }, []);

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinPrice(value ? parseFloat(value) : undefined);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxPrice(value ? parseFloat(value) : undefined);
  };

  const handleRadioChangeCategories = (category: string) => {
    setSelectedCategory(category);
  };

  const handleKeywordClick = (keyword: string) => {
    setKeyword(keyword);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setKeyword("");
  };

  return (
    <div className="sidebar">
      <h1>React Shop</h1>

      <input type="text" placeholder="Search Product" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />

      <div className="price-inputs">
        <input type="number" placeholder="Min" value={minPrice ?? ""} onChange={handleMinPriceChange} />
        <input type="number" placeholder="Max" value={maxPrice ?? ""} onChange={handleMaxPriceChange} />
      </div>

      <div className="categories">
        <h2 className="section-title">Categories</h2>
        {categories.map((category, index) => (
          <label key={index}>
            <input
              type="radio"
              name="category"
              value={category}
              onChange={() => handleRadioChangeCategories(category)}
              checked={selectedCategory === category}
            />
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </label>
        ))}
      </div>

      <div className="keywords">
        <h2 className="section-title">Keywords</h2>
        {keywords.map((keyword, index) => (
          <button key={index} onClick={() => handleKeywordClick(keyword)}>
            {keyword.charAt(0).toUpperCase() + keyword.slice(1)}
          </button>
        ))}
      </div>

      <button className="reset-button" onClick={handleResetFilters}>
        Reset Filters
      </button>
    </div>
  );
};

export default Sidebar;
