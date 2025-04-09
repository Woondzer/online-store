import { useCart } from "../../contexts/CartContext";
import { LuTrash2, LuMinus, LuPlus } from "react-icons/lu";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../contexts/AuthContext";
import LoginForm from "../LoginForm";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { user, login } = useAuth();
  const { cart, updateQuantity, removeFromCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Klick utanför = stäng
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center relative" ref={dropdownRef}>
      {/* kundkorgs knappen */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn btn-ghost btn-circle"
      >
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
          <span className="indicator-item text-white bg-[#FF0000]  rounded-full px-2 py-1 text-xs font-bold">
            {cart.reduce((sum, item) => sum + item.quantity, 0)}
          </span>
        </div>
      </button>

      {/* Dropdown content  */}
      {isOpen && (
        <div className="absolute right-0 top-0 mt-12 translate-x- w-80 bg-base-100 shadow rounded z-50 card card-compact">
          <div className="card-body">
            <span className="text-lg font-bold">
              {cart.reduce((sum, item) => sum + item.quantity, 0)} Produkter
            </span>

            <ul className="divide-y divide-gray-300 max-h-96 overflow-y-auto">
              {cart.map((item) => (
                <li
                  key={`${item.id}-${item.imageUrl}`}
                  className="flex items-center gap-2 py-3"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-14 h-14 object-cover rounded"
                  />
                  <div className="flex flex-col flex-1">
                    <p className="font-semibold text-sm">{item.title}</p>
                    <p className="text-xs text-gray-500">
                      {item.price.toLocaleString("sv-SE")} kr/st
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.imageUrl,
                            item.quantity - 1
                          )
                        }
                        disabled={item.quantity <= 1}
                        className="btn btn-xs btn-outline-none bg-red-600 hover:bg-red-900"
                      >
                        <LuMinus size={12} />
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        min={1}
                        onChange={(e) => {
                          const newQty = parseInt(e.target.value);
                          if (!isNaN(newQty) && newQty > 0) {
                            updateQuantity(item.id, item.imageUrl, newQty);
                          }
                        }}
                        className="input input-sm input-bordered w-12 text-center no-spinner"
                      />
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.imageUrl,
                            item.quantity + 1
                          )
                        }
                        className="btn btn-xs btn-outline-none bg-green-600 hover:bg-green-900"
                      >
                        <LuPlus size={12} />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id, item.imageUrl)}
                    className=" text-red-500 hover:text-[#FF9900] ml-2 cursor-pointer"
                  >
                    <LuTrash2 size={18} />
                  </button>
                </li>
              ))}
            </ul>

            <span className="text-info pt-2 font-bold text-xl">
              Totalt: {total.toLocaleString("sv-SE")} kr
            </span>

            {user ? (
              <button
                className="btn btn-primary w-full mt-4"
                disabled={cart.length === 0}
                onClick={() => navigate("/checkout")}
              >
                Till kassan
              </button>
            ) : (
              <div className="mt-4">
                <p className="mb-2 font-semibold text-center">
                  Logga in för att gå vidare till kassan
                </p>
                <LoginForm
                  onLogin={(email, password) => login(email, password)}
                />
              </div>
            )}

            {/* <div className="card-actions pt-2">
              <button className="btn btn-primary btn-block">Till kassan</button>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
