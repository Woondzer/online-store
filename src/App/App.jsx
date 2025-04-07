import "./App.css";
import RouteSwitch from "../components/RouteSwitch";
import Navbar from "../components/Navigation/Navbar";
import InfoTop from "../components/Navigation/InfoTop";
import Footer from "../components/Footer";
import { auth, db } from "../firebaseConfig";
import { CartProvider } from "../contexts/CartContext";
import { NotificationProvider } from "../contexts/NotificationContext";
import { GamesProvider } from "../contexts/GamesContext";
import { ProductCarouselProvider } from "../contexts/CarouselContext";
import { ProductsProvider } from "../contexts/ProductsContext";
import ScrollToTop from "../components/ScrollToTop";
import { IconProvider } from "../contexts/IconContext";

function App() {
  console.log("Firebase auth:", auth);
  console.log("Firebase Firestore DB:", db);
  return (
    <ProductsProvider>
      <GamesProvider>
        <ProductCarouselProvider>
          <NotificationProvider>
            <CartProvider>
              <IconProvider>
                <ScrollToTop />
                <div className="flex flex-col min-h-screen">
                  <InfoTop />
                  <Navbar />
                  <main className="flex-grow">
                    <RouteSwitch />
                  </main>
                  <Footer />
                </div>
              </IconProvider>
            </CartProvider>
          </NotificationProvider>
        </ProductCarouselProvider>
      </GamesProvider>
    </ProductsProvider>
  );
}

export default App;

// Server alternativ, node.js eller json-server(npm paket) --- blev firebase.
