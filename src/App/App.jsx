import "./App.css";
import RouteSwitch from "../components/RouteSwitch";
import Navbar from "../components/Navigation/Navbar";
import InfoTop from "../components/InfoTop";
import Footer from "../components/Footer";
import { auth, db } from "../firebaseConfig";

function App() {
  console.log("Firebase auth:", auth);
  console.log("Firebase Firestore DB:", db);
  return (
    <div className="flex flex-col min-h-screen">
      <InfoTop />
      <Navbar />
      <main className="flex-grow">
        <RouteSwitch />
      </main>
      <Footer />
    </div>
  );
}

export default App;

// Server alternativ, node.js eller json-server(npm paket)
