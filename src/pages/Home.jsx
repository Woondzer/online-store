import { useIcons } from "../contexts/IconContext";
import ProductCarousel from "../components/ProductCarousel";

const Home = () => {
  const icons = useIcons();

  return (
    <div className="flex w-full flex-col">
      {/* karusell */}

      <ProductCarousel folder="STARTPAGE" className="" />

      {/* box 2 tabs */}
      <div className="card bg-white rounded-none grid h-auto place-items-center">
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
        <img
          src="data:image/jpeg;base64,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"
          alt=""
        />
      </div>

      {/* box 3 Information */}
      <div className="bg-[#303030] p-12 w-full">
        <div className="grid grid-cols-2 gap-40 max-w-screen-2xl mx-auto ">
          {/* vänster */}
          <div className="ml-15 mt-15 gap-12 w-full">
            <div className="text-white">
              {/* Gratis frakt */}
              <div className="flex items-start mb-20 gap-4">
                <img src={icons.truck} alt="Truck" className="w-12 h-12" />
                <div>
                  <p className="text-lg font-bold">Fri Frakt över 500kr</p>
                  <p className="text-sm">
                    Beställer du varor för över 500kr så bjuder vi på frakten.
                  </p>
                </div>
              </div>

              {/* Nöjda kunder */}
              <div className="flex items-start mb-20 gap-4">
                <img src={icons.smiley} alt="Smiley" className="w-12 h-12" />
                <div>
                  <p className="text-lg font-bold">Över 50.000 Nöjda kunder!</p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm">4.9</p>
                    <img
                      src={icons.homeSTARS}
                      alt="4.9 STARS"
                      className="w-24"
                    />
                  </div>
                </div>
              </div>

              {/* recensioner */}
              <div className="flex items-start gap-4 max-w-lg">
                <img
                  src={icons.comments}
                  alt="Chat Bubble"
                  className="w-12 h-12"
                />
                <div>
                  <p className="text-lg font-bold">Era röster är viktiga!</p>
                  <p className="text-sm">
                    Därför är kundens röst i fokus när det kommer till
                    recensioner av våra varor. Vi är helt transparenta och visar
                    både bra och dåliga omdömen. Allt för att göra ditt beslut
                    så enkelt som möjligt.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* höger */}
          <div className="text-white text-left max-w-xl ml-auto mr-15 mt-15">
            <h2 className="text-2xl font-bold mb-6">
              Upplev Framtidens Gaming med Oss!
            </h2>
            <p className="mb-5">
              <span className="font-bold">VR-Experience</span>, din destination
              för den senaste VR-tekniken. Vi är passionerade gamers och
              teknikentusiaster med lång erfarenhet. Här hittar du innovativa
              och högpresterande produkter, noggrant utvalda för att ge den
              ultimata känslan av en annan verklighet.
            </p>
            <p className="mb-5">
              <span className="font-bold">Vår vision:</span> göra framtidens
              gaming tillgänglig för alla. Oavsett om du är gamer, VR-entusiast
              eller nyfiken, erbjuder vi den bästa tekniken av högsta kvalitet.
            </p>
            <p className="mb-5">
              <span className="font-bold">Hos oss får du:</span> transparens,
              grymma produkter och ett fantastiskt community.
            </p>
            <p className="mb-5">
              <span className="font-bold">Vi tror på innovation</span>,
              prestanda och enastående spelupplevelser. Hos oss hittar du
              marknadens bästa VR-headset och spelstationer, med smidig
              köpupplevelse och leverans. Redo för nästa nivå? Upplev gaming som
              aldrig förr!
            </p>
            <p className="font-bold">
              Välkommen till VR-Experience – Den virtuella världen.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
