import { NavLink } from "react-router-dom";
import SearchField from "../SearchField";

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
            to="/products"
            className="text-white font-bold hover:text-orange-400"
          >
            <div className="px-4 py-4">SPEL</div>
          </NavLink>
          <NavLink
            to="/games"
            className="text-white font-bold hover:text-orange-400"
          >
            <div className="px-4 py-4">VR - PRODUKTER</div>
          </NavLink>
        </div>
      </div>
      <SearchField />
      <div className="flex items-center">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-auto hover:text-orange-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="indicator-item text-white bg-[#FF0000] rounded-full px-2 py-1 text-xs font-bold">
                8
              </span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow"
          >
            <div className="card-body">
              <span className="text-lg font-bold">8 Items</span>
              <span className="text-info">Subtotal: $999</span>
              <div className="card-actions">
                <button className="btn btn-primary btn-block">View cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Navbar;
