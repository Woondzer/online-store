import { Link, useSearchParams } from "react-router-dom";

const OrderPlaced = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-700 p-6">
      <h1 className="text-3xl font-bold mb-4 text-green-600">
        Tack för din beställning!
      </h1>
      <p className="text-center max-w-md mb-6">
        Din order har mottagits och vi behandlar den så snabbt vi kan. Du får en
        bekräftelse via e-post inom kort.
      </p>
      {orderId && (
        <p className="text-center max-w-md mb-6 text-sm text-gray-600">
          Ditt ordernummer är: <span className="font-mono">{orderId}</span>
        </p>
      )}
      <Link to="/" className="btn btn-primary">
        Till startsidan
      </Link>
    </div>
  );
};

export default OrderPlaced;
