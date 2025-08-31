import { useEffect, useState } from "react";
import { useFilter } from "../context/FilterContext";
import { Tally3 } from "lucide-react";
import axios from "axios";
import BookCard from "../BookCard/BookCard";
import "./mainContent.scss";

const MainContent = () => {
  const { searchQuery, selectedCategory, minPrice, maxPrice, keyword } = useFilter();

  const [products, setProducts] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const itemsPerPage = 20;

  useEffect(() => {
    let url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${(currentPage - 1) * itemsPerPage}`;
    if (keyword) {
      url = `https://dummyjson.com/products/search?q=${keyword}`;
    }

    axios
      .get(url)
      .then((response) => setProducts(response.data.products))
      .catch((error) => console.error("Error fetching Data", error));
  }, [currentPage, keyword]);

  const getFilteredProducts = () => {
    let filteredProducts = products;

    if (selectedCategory) filteredProducts = filteredProducts.filter((p) => p.category === selectedCategory);
    if (minPrice !== undefined) filteredProducts = filteredProducts.filter((p) => p.price >= minPrice);
    if (maxPrice !== undefined) filteredProducts = filteredProducts.filter((p) => p.price <= maxPrice);
    if (searchQuery) filteredProducts = filteredProducts.filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()));

    switch (filter) {
      case "expensive":
        return filteredProducts.sort((a, b) => b.price - a.price);
      case "cheap":
        return filteredProducts.sort((a, b) => a.price - b.price);
      case "popular":
        return filteredProducts.sort((a, b) => b.rating - a.rating);
      default:
        return filteredProducts;
    }
  };

  const filteredProducts = getFilteredProducts();
  const totalProducts = 100;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const getPaginationButtons = () => {
    const buttons: number[] = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    for (let page = startPage; page <= endPage; page++) buttons.push(page);
    return buttons;
  };

  return (
    <section className="main-content">
      {/* Filter Dropdown */}
      <div className="filter-container">
        <div className="dropdown">
          <button onClick={() => setDropdownOpen(!dropdownOpen)}>
            <span className="flex items-center gap-2">
              <Tally3 /> {filter === "all" ? "Filter" : filter.charAt(0).toUpperCase() + filter.slice(1)}
            </span>
          </button>
          {dropdownOpen && (
            <div className="dropdown-menu">
              {["cheap", "expensive", "popular"].map((f) => (
                <button
                  key={f}
                  onClick={() => {
                    setFilter(f);
                    setDropdownOpen(false);
                  }}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div className="products-grid">
        {filteredProducts.map((product) => (
          <BookCard key={product.id} id={product.id} title={product.title} image={product.thumbnail} price={product.price} />
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <div className="pagination-buttons">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>

          {getPaginationButtons().map((page) => (
            <button key={page} onClick={() => handlePageChange(page)} className={page === currentPage ? "active" : ""}>
              {page}
            </button>
          ))}

          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default MainContent;
