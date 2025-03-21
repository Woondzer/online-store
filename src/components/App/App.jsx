import "./App.css";
import RouteSwitch from "../RouteSwitch";
import Navbar from "../Navigation/Navbar";
import InfoTop from "../InfoTop";
import Footer from "../Footer";

function App() {
  return (
    <>
      <InfoTop />
      <Navbar />
      <RouteSwitch />
      <Footer />
    </>
  );
}

export default App;
