const Products = () => {
  return (
    <div className="bg-[#f5f5f5] w-full">
      {/* Header Banner */}
      <div className="relative w-full h-38 overflow-hidden">
        <img
          src="/topBanner_extended_2560.png"
          alt="VR banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center px-12">
          <h1 className="text-white text-6xl font-bold">VR - PRODUKTER</h1>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-screen-2xl mx-auto space-y-12 px-6 py-12 text-black">
        {/* VR Kit Section */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-center font-semibold text-lg mb-6">VR - Kit</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>VR Kit 1</div>
            <div>VR Kit 2</div>
          </div>
        </section>

        {/* Spelstationer Section */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-center font-semibold text-lg mb-6">
            Spelstationer
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>Station 1</div>
            <div>Station 2</div>
          </div>
        </section>

        {/* Tillbehör Section with arrows */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-center font-semibold text-lg mb-6">Tillbehör</h2>
          <div className="flex items-center justify-between gap-4">
            <button className="btn btn-circle">❮</button>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 flex-1">
              <div>Tillbehör 1</div>
              <div>Tillbehör 2</div>
              <div>Tillbehör 3</div>
            </div>
            <button className="btn btn-circle">❯</button>
          </div>
        </section>

        {/* Populära Spel Section */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-center font-semibold text-lg mb-6">
            Populära Spel
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((_, i) => (
              <div key={i} className="text-center">
                <div className="w-full h-40 bg-gray-200 rounded mb-2"></div>
                <p className="font-semibold">Game Title {i + 1}</p>
                <p className="text-yellow-500">★★★★★</p>
                <p className="font-bold">599 kr</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <button className="btn bg-[#FF9900] hover:bg-orange-600 text-black font-semibold rounded px-6">
              Se fler
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Products;
