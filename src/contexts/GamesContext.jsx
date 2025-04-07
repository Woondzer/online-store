import { createContext, useContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { db, storage } from "../firebaseConfig";

const GamesContext = createContext();

export const GamesProvider = ({ children }) => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGamesWithImages = async () => {
      const cached = sessionStorage.getItem("gamesData");
      if (cached) {
        setGames(JSON.parse(cached));
        return;
      }

      const gamesCollection = collection(db, "games");
      const snapshot = await getDocs(gamesCollection);

      const gamesList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const gamesWithImages = await Promise.all(
        gamesList.map(async (game) => {
          try {
            const imageRef = ref(storage, `GAMES/${game.imageUrl}`);
            const url = await getDownloadURL(imageRef);
            return { ...game, imageUrl: url };
          } catch (error) {
            console.error(`kunde inte ladda bild för ${game.title}:`, error);
            return { ...game, imageUrl: "" };
          }
        })
      );

      sessionStorage.setItem("gamesData", JSON.stringify(gamesWithImages));
      setGames(gamesWithImages);
    };

    fetchGamesWithImages();
  }, []);

  return (
    <GamesContext.Provider value={{ games }}>{children}</GamesContext.Provider>
  );
};

export const useGames = () => useContext(GamesContext);
