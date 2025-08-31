import { Link } from "react-router-dom";
import "./bookCard.scss";

interface BookCardProps {
  id: number;
  title: string;
  image: string;
  price: number;
}

const BookCard = ({ id, title, image, price }: BookCardProps) => {
  return (
    <Link to={`/product/${id}`} className="book-card">
      <div className="book-info border rounded p-3 hover:shadow-lg cursor-pointer">
        <img src={image} alt={title} className="w-full h-40 object-cover mb-2 rounded" />
        <h2 className="font-semibold">{title}</h2>
        <p className="text-gray-600">Price: ${price}</p>
      </div>
    </Link>
  );
};

export default BookCard;
