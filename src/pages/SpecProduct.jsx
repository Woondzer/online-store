import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebaseConfig";
import { useCart } from "../contexts/CartContext";
import StarRating from "../components/StarRating";
import { useIcons } from "../contexts/IconContext";
import { useNavigate } from "react-router-dom";

const SpecProduct = () => {
  const { id } = useParams(); //få id från URL
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [infoBannerUrl, setInfoBannerUrl] = useState("");
  const [loadingGifUrl, setLoadingGifUrl] = useState("");
  const [recentlyBought, setRecentlyBought] = useState([]);
  const icons = useIcons();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      const cachedProduct = sessionStorage.getItem(`product-${id}`);

      try {
        const gifRef = ref(storage, "LOADING/LoadingIMG.gif");
        const gifUrl = await getDownloadURL(gifRef);
        setLoadingGifUrl(gifUrl);
      } catch (error) {
        console.error("kunde inte ladda loading GIF:", error);
      }

      if (cachedProduct) {
        const data = JSON.parse(cachedProduct);
        setProduct(data.product);
        setImageUrl(data.imageUrl);
        setInfoBannerUrl(data.infoBannerUrl || "");
        return;
      }

      let docRef = doc(db, "games", id);
      let docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        docRef = doc(db, "products", id);
        docSnap = await getDoc(docRef);
      }

      if (docSnap.exists()) {
        const data = docSnap.data();
        const productWithId = { ...data, id: docSnap.id };
        setProduct(productWithId);

        let imageURLTemp = "";
        let infoBannerURLTemp = "";

        if (data.imageUrl) {
          let imageLoaded = false;

          try {
            const imgRef = ref(storage, `GAMES/${data.imageUrl}`);
            imageURLTemp = await getDownloadURL(imgRef);
            imageLoaded = true;
          } catch (error) {
            console.warn("GAMES/ kunde inte ladda, försöker PRODUCTS/", error);
            try {
              const imgRef = ref(storage, `PRODUCTS/${data.imageUrl}`);
              imageURLTemp = await getDownloadURL(imgRef);
              imageLoaded = true;
            } catch (error) {
              console.error(
                "Misslyckades med att ladda från både GAMES och PRODUCTS",
                error
              );
            }
          }

          if (imageLoaded) {
            setImageUrl(imageURLTemp);
          }
        }

        if (data.INFOimageUrl) {
          try {
            const infoRef = ref(storage, `BIG-INFO-GAMES/${data.INFOimageUrl}`);
            infoBannerURLTemp = await getDownloadURL(infoRef);
            setInfoBannerUrl(infoBannerURLTemp);
          } catch (error) {
            console.error("kunde inte ladda infobanner-bild:", error);
          }
        }

        sessionStorage.setItem(
          `product-${id}`,
          JSON.stringify({
            product: productWithId,
            imageUrl: imageURLTemp,
            infoBannerUrl: infoBannerURLTemp,
          })
        );
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchRecentlyBought = async () => {
      try {
        const q = query(
          collection(db, "orders"),
          orderBy("createdAt", "desc"),
          limit(10)
        );
        const snapshot = await getDocs(q);

        const allItems = [];

        snapshot.docs.forEach((doc) => {
          const orderData = doc.data();
          if (orderData.items) {
            orderData.items.forEach((item) => {
              allItems.push(item);
            });
          }
        });

        const unique = [];
        const seen = new Set();

        for (let item of allItems) {
          const key = item.localid || item.id;
          if (!seen.has(key)) {
            seen.add(key);
            unique.push(item);
          }
          if (unique.length === 3) break;
        }

        setRecentlyBought(unique);
      } catch (error) {
        console.error("Kunde inte hämta nyligen köpta produkter:", error);
      }
    };

    fetchRecentlyBought();
  }, []);

  //loading GIF
  if (!product)
    return (
      <div className="flex justify-center items-center h-[500px]">
        {loadingGifUrl ? (
          <img
            src={loadingGifUrl}
            alt="Laddar produkt..."
            className="w-100 h-100"
          />
        ) : (
          <p className="text-white text-lg">Laddar produkt...</p>
        )}
      </div>
    );

  return (
    <>
      <div className="bg-white p-12 w-full">
        <div className="grid grid-cols-[1fr_auto] gap-10 w-full mx-auto">
          <img
            src={imageUrl}
            alt={product.title}
            className="justify-self-center w-auto h-70 mt-10"
          />

          <section className="text-black flex flex-col gap-4 max-w-100 justify-self-end">
            <h1 className="text-3xl font-bold">{product.title}</h1>

            <h2 className="text-2xl font-bold text-orange-600 whitespace-nowrap">
              {product.price.toLocaleString("sv-SE")} kr
            </h2>

            <button
              onClick={() => addToCart({ ...product, imageUrl })}
              className="btn w-full bg-[#FF9900] border-none shadow-none text-black  hover:bg-black hover:text-[#FF9900] font-bold text-lg rounded-lg"
            >
              Lägg till i varukorg
            </button>

            {product.paymentOptions?.Klarna && (
              <div className="flex items-center justify-between text-ws">
                <p>
                  Delbetala i {product.paymentOptions.Klarna.months} månader:
                  &nbsp;
                  {product.paymentOptions.Klarna.montlyPrice} kr/mån
                </p>
                <img src={icons.klarna} alt="Klarna ikon" />
              </div>
            )}

            <div className="mt-4">
              <h2 className="font-bold text-lg">Fri frakt</h2>&nbsp;
              {/* lägg till funktionalitet för att automatiskt känna av om fri frakt eller ej */}
              <p className="text-sm">
                Vid köp innan kl 11:00 skickas varan samma dag.
              </p>
            </div>

            <div className="border-b border-b-gray-300 pt-4 mt-4 flex flex-col gap-1">
              <div className=" flex items-center gap-2 text-sm">
                <span>{product.rating}</span>
                <StarRating rating={product.rating} />
                <span>( 349 )</span>
              </div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span>Webblager</span>
                <div className="flex items-center gap-2">
                  <span>{product.stock} st</span>
                  <img
                    src={product.stock > 0 ? icons.check : icons.cross}
                    alt="Lagerstatus"
                    className="w-4 h-auto"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      {/* Recensioner + Info + Andra har köpt */}
      <div className="bg-[#f5f5f5] py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-screen-xl mx-auto px-4">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Top recension*/}
            <div className="bg-white p-6 rounded-lg shadow text-black">
              Topprecension
            </div>

            {/* Banner */}
            {infoBannerUrl && (
              <div className="shadow rounded-lg overflow-hidden">
                <img
                  src={infoBannerUrl}
                  alt="Produktinfo-banner"
                  className="w-full h-full"
                />
              </div>
            )}

            {/* More Reviews */}
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div
                  key={i}
                  className="bg-white p-4 rounded-lg shadow text-black"
                >
                  Review {i + 1}
                </div>
              ))}
            </div>

            {/* Product Info */}
            {product.features && product.features.length > 0 && (
              <div className="bg-white p-15 rounded-lg shadow text-black">
                <h1 className="border-b border-b-gray-300 text-lag font-semibold mb-4">
                  Tekniska Specifikationer
                </h1>
                <table className="w-full text-sm">
                  <tbody>
                    {product.features.map((feature, index) => {
                      const [label, value] = feature
                        .split(":")
                        .map((s) => s.trim());

                      return (
                        <tr
                          key={index}
                          className="border-b border-b-gray-300 pb-4 last:border-b-0 last:pb-0 text-black"
                        >
                          <td className="font-semibold py-3 pr-6 w-1/3">
                            {label}
                          </td>
                          <td className="text-right py-3">{value}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Andra har köpt */}
          {recentlyBought.length > 0 && (
            <div className="bg-white rounded-lg p-6 shadow space-y-6 h-fit text-black flex flex-col items-center text-center mx-auto">
              <h3 className="text-lg font-semibold">Andra har köpt</h3>
              <div className="flex flex-col gap-6">
                {recentlyBought.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => navigate(`/product/${item.id}`)}
                    className="bg-white rounded shadow p-4 hover:shadow-md transition flex flex-col items-center text-center w-full max-w-[250px] hover:cursor-pointer"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="h-25 w-auto object-cover rounded mb-3"
                    />
                    <StarRating rating={product.rating} />
                    <h2 className="text-md font-semibold text-gray-700">
                      {item.title}
                    </h2>
                    <h3 className="text-sm font-light text-gray-600">
                      {item.subtitle}
                    </h3>

                    <p className="font-semibold text-xl text-orange-600">
                      {item.price.toLocaleString("sv-SE")} kr
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SpecProduct;
