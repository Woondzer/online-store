import { useGames } from "../contexts/GamesContext";
import GameCard from "../components/GameCard";
import ProductCarousel from "../components/ProductCarousel";

const Games = () => {
  const { games } = useGames();

  return (
    <div className="bg-[#f5f5f5] w-full">
      <ProductCarousel folder="BIG-GAMES" className="" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6 px-8 mt-10">
        {games.map((game, index) => (
          <GameCard
            key={index}
            id={game.id}
            title={game.title}
            imageUrl={game.imageUrl}
            subtitle={game.subtitle}
            price={game.price}
          />
        ))}
      </div>
    </div>
  );
};

export default Games;
