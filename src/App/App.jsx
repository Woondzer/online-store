import "./App.css";
import RouteSwitch from "../components/RouteSwitch";
import Navbar from "../components/Navigation/Navbar";
import InfoTop from "../components/Navigation/InfoTop";
import Footer from "../components/Footer";
import { auth, db } from "../firebaseConfig";
import { CartProvider } from "../contexts/CartContext";
import { NotificationProvider } from "../contexts/NotificationContext";
import { GamesProvider } from "../contexts/GamesContext";

function App() {
  console.log("Firebase auth:", auth);
  console.log("Firebase Firestore DB:", db);
  return (
    <GamesProvider>
      <NotificationProvider>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <InfoTop />
            <Navbar />
            <main className="flex-grow">
              <RouteSwitch />
            </main>
            <Footer />
          </div>
        </CartProvider>
      </NotificationProvider>
    </GamesProvider>
  );
}

export default App;

// Server alternativ, node.js eller json-server(npm paket) --- blev firebase.
