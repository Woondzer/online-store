import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Games from "../pages/Games";
import Products from "../pages/Products";
import SpecProduct from "../pages/SpecProduct";
import NotFound from "../pages/NotFound";

const RouteSwitch = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="specproduct" element={<SpecProduct />} />
      <Route path="games" element={<Games />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RouteSwitch;
