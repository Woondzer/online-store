import { useNavigate } from "react-router-dom";

const GoToProductButton = ({ productId, label = "", className = "" }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${productId}`);
  };

  return (
    <button
      onClick={handleClick}
      className={`bg-[#FF9900] text-black hover:bg-black hover:text-[#FF9900] font-bold px-6 py-3 rounded-md cursor-pointer ${className}`}
    >
      {label}
    </button>
  );
};

export default GoToProductButton;
