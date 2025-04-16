import {
  FaDiscord,
  FaTwitter,
  FaInstagram,
  FaTwitch,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";
import { useIcons } from "../contexts/IconContext";

function Footer() {
  const icons = useIcons();
  return (
    <footer className="bg-[#303030] text-base-content p-11">
      <div className="container mx-auto flex flex-wrap justify-between items-start gap-x-16 max-w-screen-2xl">
        <nav>
          <img src={icons.VRlogo} alt="VR Experience logo" />
        </nav>
        <nav>
          <h6 className="footer-title">BETALMETODER</h6>
          <div className="grid grid-cols-2 gap-4">
            <img src={icons.klarna} alt="Klarna" className="w-12" />
            <img src={icons.swish} alt="Swish" className="w-12" />
            <img src={icons.paypal} alt="" className="w-12" />
            <img src={icons.visa} alt="" className="w-12" />
          </div>
        </nav>
        <nav>
          <div className="flex flex-col items-center">
            <h6 className="footer-title">SOCIALA MEDIER</h6>
            <div className="grid grid-cols-3 gap-4 text-2xl mt-2">
              <FaDiscord className="cursor-pointer hover:text-blue-500" />
              <FaTwitter className="cursor-pointer hover:text-sky-400" />
              <FaInstagram className="cursor-pointer hover:text-pink-500" />
              <FaTwitch className="cursor-pointer hover:text-purple-500" />
              <FaYoutube className="cursor-pointer hover:text-red-500" />
              <FaTiktok className="cursor-pointer hover:text-gray-500" />
            </div>
          </div>
        </nav>
        <nav>
          <h6 className="footer-title">ADDRESS</h6>
          <div className="text-left">
            <p>VR-Experience HQ,</p>
            <p>Tech Avenue 42</p>
            <p>12345 Innovation City,</p>
            <p>Futureland</p>
          </div>
        </nav>
        <form>
          <h6 className="footer-title">Newsletter</h6>
          <fieldset className="w-80">
            <label>
              Få all den senaste informationen inom VR, våra erbjudanden och
              releaser.
            </label>
            <div className="join mt-3">
              <input
                type="email"
                placeholder="username@site.com"
                className="bg-white text-gray-500 px-4 py-2 rounded-l-xl w-full focus:outline-none"
              />
              <button className=" bg-[#FF9900] hover:bg-orange-600 text-white h-12 w-20 flex items-center justify-center rounded-r-xl cursor-pointer">
                <img src={icons.newsLetter} alt="Newsletter" />
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </footer>
  );
}
export default Footer;
