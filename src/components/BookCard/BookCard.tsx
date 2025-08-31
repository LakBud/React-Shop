import { Link } from "react-router-dom";
import { Star } from "lucide-react"; // optional rating icon later
import "./bookCard.scss";

interface BookCardProps {
  id: number;
  title: string;
  image: string;
  price: number;
  rating?: number;
}

const BookCard = ({ id, title, image, price, rating }: BookCardProps) => {
  return (
    <Link to={`/product/${id}`} className="book-card group">
      <div className="book-info border rounded-xl p-4 bg-white shadow-sm transition-transform duration-200 group-hover:shadow-lg group-hover:-translate-y-1">
        {/* Image */}
        <div className="relative w-full h-44 mb-3 overflow-hidden rounded-lg">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Title */}
        <h2 className="font-semibold text-lg text-gray-900 truncate">{title}</h2>

        {/* Price + Optional Rating */}
        <div className="flex items-center justify-between mt-2">
          <p className="text-gray-700 font-medium">${price}</p>
          {rating !== undefined && (
            <span className="flex items-center text-sm text-yellow-500">
              <Star className="w-4 h-4 mr-1 fill-yellow-400" /> {rating}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
