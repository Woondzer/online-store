import "./App.css";
import RouteSwitch from "../components/RouteSwitch";
import Navbar from "../components/Navigation/Navbar";
import InfoTop from "../components/InfoTop";
import Footer from "../components/Footer";

function App() {
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
