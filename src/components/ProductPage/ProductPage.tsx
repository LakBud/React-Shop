import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./productPage.scss";

interface Product {
  title: string;
  id: number;
  description: string;
  price: number;
  rating: number;
  images: string[];
}

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      axios
        .get<Product>(`https://dummyjson.com/products/${id}`)
        .then((response) => setProduct(response.data))
        .catch((error) => console.error(`Error fetching product data: ${error}`));
    }
  }, [id]);

  if (!product) return <h1 className="product-page loading">Loading...</h1>;

  return (
    <div className="product-page">
      {/* Product Images */}
      <div className="product-images">
        <img src={product.images[0]} alt={product.title} />
      </div>

      {/* Product Details */}
      <div className="product-details">
        <button className="back-button" onClick={() => navigate(-1)}>
          Back
        </button>
        <h1>{product.title}</h1>
        <p className="description">{product.description}</p>

        <div className="price-rating">
          <p>Price: ${product.price}</p>
          <p>Rating: {product.rating}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
