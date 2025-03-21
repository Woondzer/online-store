const Home = () => {
  return (
    <div className="flex w-full flex-col">
      {/* karusell 1 topp */}
      <div className="card bg-base-100 rounded-box grid h-auto place-items-center">
        <div className="carousel w-full">
          <div id="item1" className="carousel-item w-full">
            <img
              src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp"
              className="w-full"
            />
          </div>
          <div id="item2" className="carousel-item w-full">
            <img
              src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp"
              className="w-full"
            />
          </div>
          <div id="item3" className="carousel-item w-full">
            <img
              src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp"
              className="w-full"
            />
          </div>
          <div id="item4" className="carousel-item w-full">
            <img
              src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp"
              className="w-full"
            />
          </div>
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3">
          <a
            href="#item1"
            className="w-3 h-3 bg-white rounded-full hover:bg-gray-300 transition"
          ></a>
          <a
            href="#item2"
            className="w-3 h-3 bg-white rounded-full hover:bg-gray-300 transition"
          ></a>
          <a
            href="#item3"
            className="w-3 h-3 bg-white rounded-full hover:bg-gray-300 transition"
          ></a>
          <a
            href="#item4"
            className="w-3 h-3 bg-white rounded-full hover:bg-gray-300 transition"
          ></a>
        </div>
      </div>

      {/* box 2 tabs */}
      <div className="card bg-white rounded-box grid h-auto place-items-center">
        <h1 className="text-black font-bold mt-3">Populärt just nu!</h1>
        <div className="flex flex-col w-50 h-5">
          <div className="divider mt-1 divider-neutral"></div>
        </div>
        <div role="tablist " className="tabs tabs-border">
          <a role="tab" className="tab font-bold">
            VR - KIT
          </a>
          <a role="tab" className="tab tab-active font-bold">
            SPELSTATIONER
          </a>
          <a role="tab" className="tab font-bold">
            SPEL
          </a>
          <a role="tab" className="tab font-bold">
            TILLBEHÖR
          </a>
        </div>
      </div>

      {/* box 3 Information */}
      <div className="card bg-[#303030] rounded-box grid h-auto place-items-center">
        content
      </div>
    </div>
  );
};

export default Home;
