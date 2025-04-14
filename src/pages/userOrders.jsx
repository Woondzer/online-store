import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

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

  if (loading) return <div className="p-6">Laddar ordrar...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto text-gray-700">
      <h1 className="text-2xl font-bold mb-6">Mina ordrar</h1>
      {orders.length === 0 ? (
        <p>Du har inga ordrar ännu.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="mb-6 p-4 rounded-lg border border-gray-200 bg-white shadow"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold text-lg">Order #{order.id}</h2>
              <span
                className={`text-sm px-3 py-1 rounded-full ${
                  order.status === "Levererad"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {order.status || "Pågående"}
              </span>
            </div>
            <ul className="divide-y text-sm">
              {order.items.map((item, i) => (
                <li key={i} className="py-2 flex justify-between items-center">
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="tet-gray-500 text-xs">
                      {item.quantity} st á {item.price} kr
                    </p>
                  </div>

                  <div className="text-sm font-semibold">
                    {(item.price * item.quantity).toLocaleString("sv-SE")} kr
                  </div>
                </li>
              ))}
            </ul>
            <div className="text-right mt-3 font-bold">
              Totalt: {order.total.toLocaleString("sv-SE")} kr
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default UserOrders;
