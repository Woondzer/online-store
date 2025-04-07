import { NavLink } from "react-router-dom";
import SearchField from "./SearchField";
import Cart from "./Cart";
import User from "../User";
import { useIcons } from "../../contexts/IconContext";

function Navbar() {
  const icons = useIcons();
  return (
    <div className="navbar flex justify-between items-center bg-[#303030] shadow-sm h-28 px-11 p-0">
      <div className="flex items-center gap-x-26">
        <NavLink to="/" className="inline-flex align-bottom">
          <img
            src={icons.VRlogoText}
            alt="VR Experience Logo"
            className="h-17.5 w-auto"
          />
        </NavLink>
        {/* Navigations länkar */}
        <div className="flex items-center gap-x-26 mt-3">
          <NavLink
            to="/games"
            className="text-white font-bold hover:text-orange-400"
          >
            <div className="px-4 py-4">SPEL</div>
          </NavLink>
          <NavLink
            to="/products"
            className="text-white font-bold hover:text-orange-400"
          >
            <div className="px-4 py-4">VR - PRODUKTER</div>
          </NavLink>
        </div>
      </div>
      <div className="flex items-center space-x-10">
        <SearchField />
        <Cart />
        <User />
      </div>
    </div>
  );
}
export default Navbar;
