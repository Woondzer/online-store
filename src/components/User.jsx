import { useState, useRef, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import LoginForm from "./LoginForm";

function User() {
  const { user, login, logout, register, extraUserData } = useAuth();
  const navigate = useNavigate();

  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const loginRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (loginRef.current && !loginRef.current.contains(event.target)) {
        setShowLoginDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Fel vid utloggning:", error);
    }
  };

  // === OM INTE INLOGGAD ===
  if (!user) {
    return (
      <div className="relative" ref={loginRef}>
        <button
          className="btn btn-ghost btn-circle"
          onClick={() => setShowLoginDropdown((prev) => !prev)}
        >
          <FiUser className="text-2xl text-white" />
        </button>

        {showLoginDropdown && (
          <div className="absolute right-0 mt-3 w-80 bg-base-100 shadow-lg rounded-box z-50 p-4">
            <LoginForm onLogin={login} onRegister={register} />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar"
      >
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
      >
        <li className="text-xs text-gray-500 px-2 py-1">
          inloggad som <br />
          <span className="font-bold">
            {extraUserData?.username || user.email}
          </span>
        </li>
        <li>
          <a className="justify-between">
            Profil <span className="text-red-300">(kommer snart)</span>
          </a>
        </li>
        <li>
          <a onClick={() => navigate("/my-orders")}>Mina ordrar</a>
        </li>
        <li>
          <button onClick={handleLogout} className="text-red-600">
            Logga ut
          </button>
        </li>
      </ul>
    </div>
  );
}
export default User;
