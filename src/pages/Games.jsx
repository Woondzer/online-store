import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { db, storage } from "../firebaseConfig";
import GameCard from "../components/GameCard";
import ProductCarousel from "../components/ProductCarousel";

const Games = () => {
  const [games, setGames] = useState([]);

  //hämtar alla bilder i doc gör om de till data array
  useEffect(() => {
    const fetchGamesWithImages = async () => {
      const gamesCollection = collection(db, "games");
      const gamesSnapshot = await getDocs(gamesCollection);

      const gamesList = gamesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const gamesWithUrls = await Promise.all(
        gamesList.map(async (game) => {
          try {
            const imageRef = ref(storage, `GAMES/${game.imageUrl}`);
            const url = await getDownloadURL(imageRef);

            return { ...game, imageUrl: url };
          } catch (error) {
            console.error(
              `Kunde inte hämta bild för ${game.title}:`,
              error.code,
              error.message
            );
            return { ...game, imageUrl: "" };
          }
        })
      );
      setGames(gamesWithUrls);
    };

    fetchGamesWithImages();
  }, []);

  return (
    <>
      <ProductCarousel folder="BIG-GAMES" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6 px-8">
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
    </>
  );
};

export default Games;
