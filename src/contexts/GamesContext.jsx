import { createContext, useContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

const GamesContext = createContext();

export const GamesProvider = ({ children }) => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      const cached = sessionStorage.getItem("all-games");
      if (cached) {
        setGames(JSON.parse(cached));
        return;
      }

      const gamesCollection = collection(db, "games");
      const snapshot = await getDocs(gamesCollection);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setGames(data);
      sessionStorage.setItem("all-games", JSON.stringify(data));
    };
    fetchGames();
  }, []);

  return (
    <GamesContext.Provider value={{ games }}>{children}</GamesContext.Provider>
  );
};

export const useGames = () => useContext(GamesContext);
