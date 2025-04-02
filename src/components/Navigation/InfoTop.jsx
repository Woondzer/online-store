function InfoTop() {
  return (
    <div className=" bg-black text-white text-xs py-2 px-11 flex justify-between items-center">
      <div className="font-semibold"> Fri frakt över 500kr</div>

      <div className="flex items-center space-x-4">
        <img src="/Phone.svg" alt="" className="w-5 h-auto" />
        <span> (+46) 050-549 28 49</span>
        <img src="/Mail.svg" alt="" className="w-5 h-auto" />
        <span> support@VR-Experience.com</span>
      </div>
    </div>
  );
}
export default InfoTop;
