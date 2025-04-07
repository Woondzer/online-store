import { NavLink } from "react-router-dom";
import { useProducts } from "../contexts/ProductsContext";
import { useGames } from "../contexts/GamesContext";
import { useEffect, useState } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebaseConfig";
import ProductCarouselGrid from "../components/ProductCarouselGrid";
import StarRating from "../components/StarRating";
import GoToProductButton from "../components/GoToProductBTN";

const Products = () => {
  const { products } = useProducts();
  const { games } = useGames();
  const [topBannerUrl, setTopBannerUrl] = useState("");
  const vrKits = products.filter((p) => p.category === "vr-kit");
  const stations = products.filter((p) => p.category === "spelstation");
  const accessories = products.filter((p) => p.category === "tillbehör");
  const popularGames = games
    .filter((p) => p.rating && p.reviews)
    .sort((a, b) => b.reviews - a.reviews)
    .slice(0, 4);

  useEffect(() => {
    const fetchBanner = async () => {
      const cached = sessionStorage.getItem("productBanner");
      if (cached) {
        setTopBannerUrl(JSON.parse(cached));
        return;
      }

      try {
        const bannerRef = ref(storage, "ICONS/topBanner-Produkter.png");
        const url = await getDownloadURL(bannerRef);
        setTopBannerUrl(url);
        sessionStorage.setItem("productBanner", JSON.stringify(url));
      } catch (error) {
        console.error("kunde inte ladda top banner:", error);
      }
    };

    fetchBanner();
  }, []);

  return (
    <div className="bg-[#f5f5f5] w-full">
      {/* BANNER */}
      <div className="relative w-full h-38 overflow-hidden">
        {topBannerUrl && (
          <img
            src={topBannerUrl}
            alt="VR banner"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 flex items-center px-12">
          <h1 className="text-white text-6xl font-bold">VR - PRODUKTER</h1>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-screen-2xl mx-auto space-y-12 px-6 py-12 text-black">
        {/* VR Kit Sektion */}
        <ProductCarouselGrid title="VR - Kit" items={vrKits} />

        {/* Spelstationer Section */}

        <ProductCarouselGrid title="Spelstationer" items={stations} />

        {/* Tillbehör sektion karusell */}
        <ProductCarouselGrid title="Tillbehör" items={accessories} />

        {/* Populära Spel Sektion */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-center font-bold text-3xl mb-6">Populära Spel</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {popularGames.map((game) => (
              <NavLink to={`/product/${game.id}`} key={game.id}>
                <div key={game.id} className="text-center">
                  <img
                    src={game.imageUrl}
                    alt={game.title}
                    className="w-full h-40 object-contain rounded mb-2"
                  />

                  <p className="font-bold text-xl">{game.title}</p>
                  <p className="text-2xl font-bold text-orange-600 whitespace-nowrap mt-2">
                    {game.price} kr
                  </p>
                  <div className="flex justify-center items-center gap-2 mt-2">
                    <StarRating rating={game.rating} />
                    <span className="text-sm text-gray-500">
                      ({game.reviews})
                    </span>
                  </div>
                  <GoToProductButton
                    productId={game.id}
                    label="Till produkt"
                    className="p-0 mt-5"
                  />
                </div>
              </NavLink>
            ))}
          </div>
          <div className="text-center mt-6">
            <NavLink
              to="/games"
              className="btn bg-[#FF9900] hover:bg-black hover:text-[#FF9900] text-black font-semibold rounded px-6 border-none"
            >
              Se fler
            </NavLink>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Products;
