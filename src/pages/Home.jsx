import { useIcons } from "../contexts/IconContext";
import ProductCarousel from "../components/ProductCarousel";
import PopularTabs from "../components/PopularTabs";

const Home = () => {
  const icons = useIcons();

  return (
    <div className="flex w-full flex-col bg-white">
      {/* karusell */}

      <ProductCarousel folder="STARTPAGE" className="" />

      {/* box 2 tabs */}
      <PopularTabs />

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
