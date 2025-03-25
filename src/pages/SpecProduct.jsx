const SpecProduct = () => {
  return (
    <>
      {/* main box */}
      <div className="bg-white p-12 w-full">
        <div className="grid grid-cols-2 gap-40 w-full mx-auto">
          <img
            src="resident-evil.svg"
            alt=""
            className="justify-self-end w-95 h-auto"
          />

          <section className="text-black flex flex-col gap-4 max-w-100 justify-self-end">
            <h1 className="text-3xl font-bold">Resident Evil 4</h1>

            <h2 className="text-2xl font-bold">599 kr</h2>

            <button className="btn w-full bg-[#FF9900] hover:bg-orange-600 border-none shadow-none text-black font-bold text-lg rounded-lg">
              Lägg till i varukorg
            </button>

            <div className="flex items-center justify-between text-xs">
              <p>Del betala i 12månader: 49/mån</p>
              <img
                src="/klarna.svg"
                alt="klarna logga"
                className="w-10 h-auto"
              />
            </div>

            <div className="mt-4">
              <h2 className="font-bold text-lg">Fri frakt</h2>
              <p className="text-sm">
                Vid köp innan kl 11:00 skickas varan samma dag.
              </p>
            </div>

            <div className="border-b border-b-gray-300 pt-4 mt-4 flex flex-col gap-1">
              <div className=" flex items-center gap-2 text-sm">
                <span>4.3</span>
                <img
                  src="homeSTARS.svg"
                  alt="stjärn betyg"
                  className="w-20 h-auto"
                />
                <span>( 349 )</span>
              </div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span>Webblager</span>
                <div className="flex items-center gap-2">
                  <span>12st</span>
                  <img src="/CheckMark.svg" alt="bock" className="w-4 h-auto" />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      {/* Recensioner + Info + Andra har köpt */}
      <div className="bg-[#f5f5f5] py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-screen-xl mx-auto px-4">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Top recension*/}
            <div className="bg-white p-6 rounded-lg shadow text-black">
              Topprecension
            </div>

            {/* Resident Evil Banner */}
            <div className="shadow rounded-lg overflow-hidden">
              <img
                src="residentEvilBIG.png"
                alt=""
                className=" w-full h-auto"
              />
            </div>

            {/* More Reviews */}
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div
                  key={i}
                  className="bg-white p-4 rounded-lg shadow text-black"
                >
                  Review {i + 1}
                </div>
              ))}
            </div>

            {/* Product Info */}
            <div className="bg-white p-6 rounded-lg shadow text-black">
              Produktinfo
            </div>
          </div>

          {/* Right Column - Andra har köpt */}
          <div className="bg-white rounded-lg p-4 shadow space-y-6 h-fit text-black">
            <h3 className="text-lg font-semibold">Andra har köpt</h3>

            {[1, 2, 3].map((_, i) => (
              <div
                key={i}
                className="border-b border-b-gray-300 pb-4 last:border-b-0 last:pb-0 text-black"
              >
                <div className="w-24 h-24 bg-gray-200 rounded mb-2"></div>
                <p className="text-sm font-semibold">Spel Titel {i + 1}</p>
                <p className="text-sm text-yellow-500">★★★★★</p>
                <p className="text-sm font-bold mt-1">599 kr</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SpecProduct;
