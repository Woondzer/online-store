import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Link } from "react-router-dom";

const UserOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      const q = query(
        collection(db, "orders"),
        where("userId", "==", user.uid)
      );
      const snapshot = await getDocs(q);
      const orderList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(orderList);
      setLoading(false);
    };
    fetchOrders();
  }, [user]);

  const handleCancelOrder = async (orderId) => {
    try {
      const ref = doc(db, "orders", orderId);
      await updateDoc(ref, { status: "Avbruten" });

      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: "Avbruten" } : order
        )
      );
    } catch (error) {
      console.error("Kunde inte avbryta order:", error);
      alert("Något gick fel. Försök igen.");
    }
  };

  const handleRestoreOrder = async (orderId) => {
    try {
      const ref = doc(db, "orders", orderId);
      await updateDoc(ref, { status: "Pågående" });

      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: "Pågående" } : order
        )
      );
    } catch (error) {
      console.log("Kunde inte återställa order:", error);
      alert("Något gick fel. Försök igen.");
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await deleteDoc(doc(db, "orders", orderId));
      setOrders((prev) => prev.filter((order) => order.id !== orderId));
    } catch (error) {
      console.error("Kunde inte ta bort order:", error);
      alert("Något gick fel. Försök igen.");
    }
  };

  if (loading) return <div className="p-6">Laddar ordrar...</div>;

  return (
    <div className="w-full bg-[#f5f5f5]">
      <div className="p-6 max-w-4xl mx-auto  text-gray-700">
        <h1 className="text-2xl font-bold mb-6 ">Mina ordrar</h1>
        {orders.length === 0 ? (
          <p>Du har inga ordrar ännu.</p>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="mb-6 p-4 rounded-lg border border-gray-200 bg-white shadow"
            >
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="text-xs text-gray-500 mb-1">
                    Beställd:{" "}
                    {order.createdAt?.toDate
                      ? order.createdAt.toDate().toLocaleDateString("sv-SE", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "Okänt datum"}
                  </p>
                  <h2 className="font-semibold text-lg">Order #{order.id}</h2>
                </div>
                <span
                  className={`text-sm px-3 py-1 rounded-full ${
                    order.status === "Levererad"
                      ? "bg-green-100 text-green-700"
                      : order.status === "Avbruten"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.status || "Pågående"}
                </span>
              </div>
              <ul className="divide-y divide-gray-300 text-sm">
                {order.items.map((item, i) => (
                  <li
                    key={i}
                    className="py-2 flex justify-between items-center gap-3"
                  >
                    <div className="flex items-center gap-3">
                      {item.imageUrl && (
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="h-14 w-14 object-cover rounded shadow-md"
                        />
                      )}
                      <div className="flex flex-col">
                        <p className="font-semibold mb-1">{item.title}</p>
                        <p className="text-gray-500 text-xs">
                          {item.quantity} st á {item.price} kr
                        </p>
                      </div>
                    </div>

                    <div className="text-sm font-semibold text-right min-w-[80px]">
                      {(item.price * item.quantity).toLocaleString("sv-SE")} kr
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-4 text-sm text-gray-600">
                <p>
                  <span className="font-semibold">Fraktmetod:</span>{" "}
                  {order.shippingMethod || "Okänd"}
                </p>
                <p>
                  <span className="font-semibold">Fraktkostnad:</span>{" "}
                  {order.total >= 500
                    ? "Gratis"
                    : `${(order.shippingFee ?? 0).toLocaleString("sv-SE")} kr`}
                </p>
              </div>

              {order.status === "Pågående" && (
                <button
                  onClick={() => handleCancelOrder(order.id)}
                  className="mt-4 text-sm text-red-600 hover:underline hover:cursor-pointer"
                >
                  Avbryt order
                </button>
              )}

              {order.status === "Avbruten" && (
                <div className="mt-4 flex gap-4 text-sm">
                  <button
                    onClick={() => handleRestoreOrder(order.id)}
                    className=" mt-4 mr-4 text-green-600 hover:underline hover:cursor-pointer"
                  >
                    Ångra avbrytning
                  </button>
                  <button
                    onClick={() => handleDeleteOrder(order.id)}
                    className="mt-4 text-sm text-gray-500 hover:underline hover:cursor-pointer"
                  >
                    Ta bort order
                  </button>
                </div>
              )}

              <div className="text-right mt-3 font-bold">
                Totalt: {order.total.toLocaleString("sv-SE")} kr
              </div>
            </div>
          ))
        )}

        <div className="mt-12 text-center">
          <Link to="/" className="btn btn-primary">
            Till startsidan
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserOrders;
