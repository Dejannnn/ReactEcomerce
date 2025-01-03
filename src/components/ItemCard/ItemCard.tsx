import { Link } from "react-router-dom";
//Types
import { ItemCardProps } from "./types";

const ItemCard = ({ id, title, thumbnail, price }: ItemCardProps) => {
  return (
    <Link to={`/product/${id}`} className="border border-gray-200 p-4 rounded">
      <img
        src={thumbnail}
        alt={title}
        className="w-full h-32 object-cover mb-2"
      />
      <h2 className="font-bold line-clamp-2	">{title}</h2>
      <p>${price}</p>
    </Link>
  );
};

export default ItemCard;
