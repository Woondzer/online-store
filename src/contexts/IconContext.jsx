import { createContext, useContext, useEffect, useState } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebaseConfig";

const IconContext = createContext();

export const IconProvider = ({ children }) => {
  const [icons, setIcons] = useState({
    klarna: "",
    paypal: "",
    swish: "",
    visa: "",
    check: "",
    cross: "",
    comments: "",
    newsLetter: "",
    email: "",
    phone: "",
    smiley: "",
    truck: "",
    VRlogo: "",
    VRlogoText: "",
    homeSTARS: "",
    addCart: "",
  });

  useEffect(() => {
    const cached = sessionStorage.getItem("iconData");
    if (cached) {
      setIcons(JSON.parse(cached));
      return;
    }

    const fetchIcons = async () => {
      try {
        const klarna = await getDownloadURL(ref(storage, "PAYMENT/klarna.svg"));
        const paypal = await getDownloadURL(
          ref(storage, "PAYMENT/paypal_white.svg")
        );
        const swish = await getDownloadURL(
          ref(storage, "PAYMENT/swish_white.svg")
        );
        const visa = await getDownloadURL(ref(storage, "PAYMENT/visa.png"));
        const check = await getDownloadURL(ref(storage, "ICONS/CheckMark.svg"));
        const cross = await getDownloadURL(
          ref(storage, "ICONS/CrossMarkButton.svg")
        );
        const comments = await getDownloadURL(
          ref(storage, "ICONS/Comments.svg")
        );
        const newsLetter = await getDownloadURL(
          ref(storage, "ICONS/Email-Open.svg")
        );
        const email = await getDownloadURL(ref(storage, "ICONS/Mail.svg"));
        const phone = await getDownloadURL(ref(storage, "ICONS/Phone.svg"));
        const smiley = await getDownloadURL(ref(storage, "ICONS/Smiling.svg"));
        const truck = await getDownloadURL(ref(storage, "ICONS/Truck.svg"));
        const VRlogo = await getDownloadURL(
          ref(storage, "ICONS/VR-Experience-Logo.svg")
        );
        const VRlogoText = await getDownloadURL(
          ref(storage, "ICONS/VR-Experience-logo-text.svg")
        );

        const homeSTARS = await getDownloadURL(
          ref(storage, "ICONS/homeSTARS.svg")
        );
        const addCart = await getDownloadURL(ref(storage, "ICONS/AddCart.svg"));

        const iconData = {
          klarna,
          paypal,
          swish,
          visa,
          check,
          cross,
          comments,
          newsLetter,
          email,
          phone,
          smiley,
          truck,
          VRlogo,
          VRlogoText,
          homeSTARS,
          addCart,
        };
        setIcons(iconData);
        sessionStorage.setItem("iconData", JSON.stringify(iconData));
      } catch (error) {
        console.error("kunde inte hämta ikoner:", error);
      }
    };

    fetchIcons();
  }, []);

  return <IconContext.Provider value={icons}>{children}</IconContext.Provider>;
};

export const useIcons = () => useContext(IconContext);
