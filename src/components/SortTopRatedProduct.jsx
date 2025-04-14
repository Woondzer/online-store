import { useEffect, useState } from "react";
import { useGames } from "../contexts/GamesContext";
import { useProducts } from "../contexts/ProductsContext";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

const SortTopRatedProduct = ({ category }) => {
  const { games } = useGames();
  const { products } = useProducts();
  const [topItem, setTopItem] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // vilken kategori ska vi hämta data från
    const allItems =
      category === "spel"
        ? games
        : products.filter((p) => p.category === category);

    // sortera efter rating och reviews
    const top = allItems
      .filter((item) => item.category === category)
      .sort((a, b) => {
        if (b.rating === a.rating) return b.reviews - a.reviews;
        return b.rating - a.rating;
      })[0];

    if (top) {
      setTopItem(top);
      const imageRef = ref(storage, top.imageUrl);
      getDownloadURL(imageRef).then((url) => setImageUrl(url));
    }
  }, [category, games, products]);

  if (!topItem) return <p>Laddar populär produkt...</p>;

  return (
    <div className="card w-full bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
      <figure>
        <img
          src={imageUrl}
          alt={topItem.title}
          className="object-cover h-48 w-full"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{topItem.title}</h2>
        <p>
          {topItem.rating}stjärna({topItem.reviews}omdömen)
        </p>
        <p>{topItem.price.toLocaleString("se-SV")} kr</p>
        <div className="card-actions justify-end">
          <button
            className="btn btn-primary"
            onClick={() =>
              navigate(
                topItem.slug
                  ? `/product/${topItem.slug}`
                  : `/product/${topItem.id}`
              )
            }
          >
            Till produkten
          </button>
        </div>
      </div>
    </div>
  );
};

export default SortTopRatedProduct;
