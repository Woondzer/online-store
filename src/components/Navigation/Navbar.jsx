import { NavLink } from "react-router-dom";
import SearchField from "../SearchField";
import Cart from "../Cart";
import User from "../User";

function Navbar() {
  return (
    <div className="navbar flex justify-between items-center bg-[#303030] shadow-sm h-28 px-11 p-0">
      {/* Left: Logo + Links (Grouped Together) */}
      <div className="flex items-center gap-x-26">
        <NavLink to="/" className="inline-flex align-bottom">
          <img
            src="/VR-Experience-logo-text.svg"
            alt="Logo"
            className="h-17.5 w-auto"
          />
        </NavLink>
        {/* Navigation Links */}
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
