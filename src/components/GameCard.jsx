function GameCard() {
  return (
    <div className="card bg-base-100 w-50 shadow-sm relative group">
      <figure className="relative rounded-lg">
        <img src="/resident-evil.svg" alt="Shoes" />
        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
          <button className="btn btn-sm btn-outline text-white">Info</button>
          <button className="btn btn-sm btn-primary">Add to Cart</button>
        </div>
      </figure>

      <div className="card-body">
        <h2 className="card-title flex justify-center">Card Title</h2>
        <p>
          A card component has a figure, a body part, and inside body there are
          title and actions parts
        </p>
        <h2 className="card-title flex justify-center">599kr</h2>
      </div>
    </div>
  );
}

export default GameCard;
