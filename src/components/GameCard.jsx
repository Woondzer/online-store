import { useCart } from "../contexts/CartContext";
import GoToProductButton from "./GoToProductBTN";

function GameCard({ id, title, imageUrl, price, subtitle }) {
  const { addToCart } = useCart();

  return (
    <div className="card w-50 relative group">
      <figure className="relative rounded-lg">
        <img src={imageUrl} alt={title} />
        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
          <GoToProductButton productId={id} label="info" className="p-0" />

          <button
            onClick={() => addToCart({ title, imageUrl, price })}
            className="btn btn-sm btn-primary"
          >
            Add to Cart
          </button>
        </div>
      </figure>

      <div className="card-body text-black w-[200px] p-0 mb-15">
        <h2 className="card-title flex justify-center font-bold">{title}</h2>
        <p className="flex justify-center font-semibold">{subtitle}</p>
        <h2 className="card-title flex justify-center font-bold text-orange-600">
          {price} kr
        </h2>
      </div>
    </div>
  );
}

export default GameCard;
