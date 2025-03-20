import "./App.css";
import RouteSwitch from "../RouteSwitch";
import Navbar from "../Navigation/Navbar";
import InfoTop from "../InfoTop";

function App() {
  return (
    <>
      <InfoTop />
      <Navbar />
      <RouteSwitch />
    </>
  );
}

export default App;
