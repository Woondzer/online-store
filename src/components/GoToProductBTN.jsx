import { useNavigate } from "react-router-dom";

const GoToProductButton = ({ productId, label = "", className = "" }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${productId}`);
  };

  return (
    <button
      onClick={handleClick}
      className={`bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-md cursor-pointer ${className}`}
    >
      {label}
    </button>
  );
};

export default GoToProductButton;
