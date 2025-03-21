import {
  FaDiscord,
  FaTwitter,
  FaInstagram,
  FaTwitch,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-11">
      <nav>
        <img src="VR-Experience-Logo.svg" alt="" />
      </nav>
      <nav>
        <h6 className="footer-title">BETALMETODER</h6>
        <div className="grid grid-cols-2 gap-4">
          <img src="/klarna.svg" alt="Klarna" className="w-12" />
          <img src="/swish_white.svg" alt="Swish" className="w-12" />
          <img src="/paypal_white.svg" alt="" className="w-12" />
          <img src="visa.png" alt="" className="w-12" />
        </div>
      </nav>
      <nav>
        <div className="flex flex-col items-center">
          <p className="text-sm font-bold mb-2">SOCIALA MEDIER</p>
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
          <label>Enter your email address</label>
          <div className="join">
            <input
              type="text"
              placeholder="username@site.com"
              className="input input-bordered join-item"
            />
            <button className="btn btn-primary join-item">
              <img src="/Email-Open.svg" alt="" />
            </button>
          </div>
        </fieldset>
      </form>
    </footer>
  );
}
export default Footer;
