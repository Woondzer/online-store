import { useIcons } from "../../contexts/IconContext";

function InfoTop() {
  const icons = useIcons();

  return (
    <div className=" bg-black text-white text-xs py-2 px-11 flex justify-between items-center">
      <div className="flex items-center space-x-4 font-semibold">
        <img src={icons.truck} alt="truck" className="w-5 h-auto" />
        <span>Fri frakt över 500kr</span>
      </div>

      <div className="flex items-center space-x-4">
        <img src={icons.phone} alt="phone" className="w-5 h-auto" />
        <span> (+46) 050-549 28 49</span>
        <img src={icons.email} alt="email" className="w-5 h-auto" />
        <span> support@VR-Experience.com</span>
      </div>
    </div>
  );
}
export default InfoTop;
