import React, { useContext, useEffect, useState } from "react";
import "./Banner.scss";
import BannerImg from "../../../assets/banner-img.png";
import { Context } from "../../../utils/context";

const Banner = () => {
  const { abouts } = useContext(Context);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [canInstall, setCanInstall] = useState(false);

  const heading = abouts?.[0]?.heading || "SALES";
  const description =
    abouts?.[0]?.description ||
    "Convallis interdum purus adipiscing dis parturient posuere ac a quam a eleifend montes parturient posuere curae tempor";

  useEffect(() => {
    const beforeInstallHandler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setCanInstall(true);
    };

    window.addEventListener("beforeinstallprompt", beforeInstallHandler);

    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      setCanInstall(false);
    });

    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", beforeInstallHandler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    if (choiceResult.outcome === "accepted") {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
    setCanInstall(false);
  };

  return (
    <div className="hero-banner">
      <div className="content">
        <div className="text-content">
          <h1>{heading}</h1>
          <p>{description}</p>
          <div className="ctas">
            {!isInstalled && canInstall ? (
              <div className="banner-cta install-btn">
                <button onClick={handleInstall}>Install App</button>
              </div>
              
            ) : (
              <div className="banner-cta">
                <a href="#About">Read More</a>
              </div>
            )}
            <div className="banner-cta v2">
              <a href="#Product">Shop Now</a>
            </div>
          </div>
        </div>
        <img className="banner-img" src={BannerImg} alt="Banner" />
      </div>
    </div>
  );
};

export default Banner;
