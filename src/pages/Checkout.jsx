import { useState, useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebaseConfig";
import {
  doc,
  getDoc,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { useIcons } from "../contexts/IconContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Checkout = () => {
  const { user } = useAuth();
  const { cart, clearCart } = useCart();
  const items = cart || [];
  const icons = useIcons();
  const navigate = useNavigate();
  const paymentOptions = [
    { name: "Kort", icon: icons.visa },
    { name: "PayPal", icon: icons.paypal },
    { name: "Klarna", icon: icons.klarna },
    { name: "Swish", icon: icons.swish },
  ];

  const [userData, setUserData] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [shippingMethod, setShippingMethod] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const FREE_SHIPPING_LIMIT = 500;
  const SHIPPING_COST = 149;

  const cartTotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const isPickup = deliveryMethod === "pickup";
  const shippingFee = isPickup
    ? 0
    : cartTotal >= FREE_SHIPPING_LIMIT
    ? 0
    : SHIPPING_COST;

  const totalCost = cartTotal + shippingFee;

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      }
    };
    fetchUserData();
  }, [user]);

  useEffect(() => {
    if (deliveryMethod === "pickup") {
      setCurrentStep(3);
      setShippingMethod("");
    } else if (deliveryMethod === "shipping") {
      setCurrentStep(2);
    }
  }, [deliveryMethod]);

  const handleContinue = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const isStepComplete = (step) => {
    if (step === 1) return deliveryMethod !== "";
    if (step === 2 && deliveryMethod === "shipping")
      return shippingMethod !== "";
    if (step === 3) return paymentMethod !== "";
    return false;
  };

  const handlePlaceOrder = async () => {
    if (!user || !userData) return;

    try {
      const order = {
        userId: user.uid,
        customer: {
          name: `${userData.firstName} ${userData.lastName}`,
          email: userData.email,
          address: userData.address,
          postalCode: userData.postalCode,
          phone: userData.phone,
        },
        items: items.map((item) => ({
          title: item.title,
          subtitle: item.subtitle || "",
          quantity: item.quantity,
          price: item.price,
          imageUrl: item.imageUrl || "",
          id: item.id || item.localid,
        })),
        total: totalCost,
        shippingFee,
        deliveryMethod,
        shippingMethod: shippingMethod || "ej valt",
        paymentMethod,
        status: "Pågående",
        createdAt: serverTimestamp(),
      };

      console.log("🧾 Order-data som skickas till Firestore:", order);
      order.items.forEach((item, index) => {
        console.log(`🛒 Produkt ${index + 1}:`, item);
      });

      const docRef = await addDoc(collection(db, "orders"), order);
      clearCart();
      navigate(`/order-placed?orderId=${docRef.id}`);
    } catch (err) {
      console.error("Kunde inte lägga beställning:", err);
      toast.error("Något gick fel. Försök igen.");
    }
  };

  return (
    <div className="bg-[#f5f5f5]">
      <div className="flex flex-col lg:flex-row gap-8 px-8 py-10 text-gray-600">
        {/* vänster: Steg för beställning */}
        <div className="w-full lg:w-2/3 space-y-6">
          {/* Steg 1: leverans Metod */}
          <div className=" rounded-lg shadow p-6 bg-white">
            <h3 className="text-lg font-semibold text-gray-600 flex justify-between">
              Välj Leveranssätt <span className="text-gray-500">Steg 1/4</span>
            </h3>
            <div className="mt-4 space-y-3">
              <label
                className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all ${
                  deliveryMethod === "pickup"
                    ? "border-gray-500 bg-gray-50"
                    : "border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="delivery"
                  value="pickup"
                  checked={deliveryMethod === "pickup"}
                  onChange={() => setDeliveryMethod("pickup")}
                />
                Hämta i butik
              </label>

              <label
                className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all ${
                  deliveryMethod === "shipping"
                    ? "border-gray-500 bg-gray-50"
                    : "border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="delivery"
                  value="shipping"
                  checked={deliveryMethod === "shipping"}
                  onChange={() => setDeliveryMethod("shipping")}
                />
                Skicka till mig
              </label>
            </div>

            {isStepComplete(1) && currentStep === 1 && (
              <button onClick={handleContinue} className="btn btn-primary mt-6">
                Fortsätt
              </button>
            )}
          </div>

          {/* Steg 2: frakt Metod */}
          {deliveryMethod === "shipping" && (
            <div
              className={`rounded-lg shadow p-6 bg-white ${
                currentStep >= 2 ? "" : "opacity-50 pointer-events-none"
              }`}
            >
              <h3 className="text-lg font-semibold flex justify-between">
                Välj Fraktsätt <span className="text-gray-500">Steg 2/4</span>
              </h3>
              <div className="mt-4 space-y-3">
                {["Schenker", "PostNord"].map((method) => (
                  <label
                    key={method}
                    className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all ${
                      shippingMethod === method
                        ? "border-gray-500 bg-gray-50"
                        : "border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="shipping"
                      value={method}
                      checked={shippingMethod === method}
                      onChange={() => setShippingMethod(method)}
                    />
                    {method}
                  </label>
                ))}
              </div>

              {isStepComplete(2) && (
                <button
                  onClick={handleContinue}
                  className="btn btn-primary mt-6"
                >
                  Fortsätt
                </button>
              )}
            </div>
          )}

          {/* Steg 4: Betalnings Metod */}
          <div
            className={`rounded-lg shadow p-6 text-gray-600 bg-white ${
              currentStep >= 3 ? "" : "opacity-50 pointer-events-none"
            }`}
          >
            <h3 className="text-lg font-semibold flex justify-between">
              Välj Betalsätt <span className="text-gray-500">Steg 3/4</span>
            </h3>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {paymentOptions.map(({ name, icon }) => (
                <label
                  key={name}
                  className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all bg-gray-200 ${
                    paymentMethod === name
                      ? "border-gray-500 bg-gray-400"
                      : "border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={name}
                    checked={paymentMethod === name}
                    onChange={() => setPaymentMethod(name)}
                  />
                  <span className="flex items-center gap-2">
                    {icon && (
                      <img
                        src={icon}
                        alt={name}
                        className="h-8 w-auto shadow rounded"
                      />
                    )}
                  </span>
                </label>
              ))}
            </div>

            {isStepComplete(3) && (
              <button onClick={handleContinue} className="btn btn-primary mt-6">
                Fortsätt
              </button>
            )}
          </div>

          {/* Steg 4: Kund Info */}
          <div
            className={`bg-white rounded-lg shadow p-6 ${
              currentStep >= 4 ? "" : "opacity-50 pointer-events-none"
            }`}
          >
            <h3 className="text-lg font-semibold flex justify-between">
              Kundinformation <span className="text-gray-500">Steg 4/4</span>
            </h3>
            <p className="mt-3 text-gray-600 text-sm">
              Kontrollera att dina uppgifter stämmer innan du lägger
              beställningen.
            </p>
            {userData && (
              <>
                <div className="mt-4 space-y-2">
                  <div className="text-sm text-gray-700">
                    Namn: {userData.firstName} {userData.lastName}
                  </div>
                  <div className="text-sm text-gray-700">
                    Mail: {userData.email}
                  </div>
                  <div className="text-sm text-gray-700">
                    Adress: {userData.address}, {userData.postalCode}
                  </div>
                  <div className="text-sm text-gray-700">
                    Telefon: {userData.phone}
                  </div>
                </div>
              </>
            )}
            <button
              onClick={handlePlaceOrder}
              className="btn btn-success mt-6 w-full"
            >
              Lägg beställning
            </button>
          </div>
        </div>

        {/* höger summering av kundvagn */}
        <div className="w-full lg:w-1/3 bg-white rounded-lg shadow p-6 h-fit">
          <h3 className="text-lg font-semibold mb-4">Summering</h3>
          <ul className="divide-y divide-gray-300">
            {(items || []).map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between py-3"
              >
                <div className="flex items-center gap-3">
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-12 h-12 object-cover rounded"
                    />
                  )}
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-500">{item.quantity} st</p>
                  </div>
                </div>
                <div className="font-medium">
                  {(item.price * item.quantity).toLocaleString("sv-SE")} kr
                </div>
              </li>
            ))}
          </ul>

          <div className="border-t border-gray-300 pt-4 mt-4 space-y-1 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Frakt</span>
              <span>{shippingFee === 0 ? "gratis" : `${shippingFee} kr`}</span>
            </div>
            <div className="flex justify-between font-bold text-black text-base">
              <span>Total</span>
              <span>{totalCost.toLocaleString("sv-SE")} kr</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Checkout;
