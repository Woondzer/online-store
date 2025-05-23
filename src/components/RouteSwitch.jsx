import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Games from "../pages/Games";
import Products from "../pages/Products";
import SpecProduct from "../pages/SpecProduct";
import Register from "../pages/Register";
import Checkout from "../pages/Checkout";
import NotFound from "../pages/NotFound";
import OrderPlaced from "../pages/OrderPlaced";
import MyOrders from "../pages/userOrders.jsx";

const RouteSwitch = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<SpecProduct />} />
      <Route path="games" element={<Games />} />
      <Route path="register" element={<Register />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/order-placed" element={<OrderPlaced />} />
      <Route path="/my-orders" element={<MyOrders />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RouteSwitch;
