import spartakSvg from "../../../../materials/logos/spartak/spartak.svg";
import spartakPng from "../../../../materials/logos/spartak/spartak.png";
import ukraineSvg from "../../../../materials/logos/ukraine/ukraine.svg";
import ukrainePng from "../../../../materials/logos/ukraine/ukraine.png";
import sgostuSvg from "../../../../materials/logos/sgostu/sgostu.svg";
import sgostuPng from "../../../../materials/logos/sgostu/sgostu.png";
import { useEffect } from "react";
import Logo from "./Logo/Logo";
import "./Logos.css";

export default function Logos() {
  const language = window.localStorage.getItem("language");
  //   const logos = [
  //     sgostuSvg,
  //     sgostuPng,
  //     ukraineSvg,
  //     ukrainePng,
  //     spartakSvg,
  //     spartakPng,
  //   ];
  //   const logoTypes = ["sgostu", "ukraine", "spartak"];
  useEffect(() => {
    const buttons = document.querySelectorAll(".logo-download-link");
    function activeLink() {
      this.classList.add("downloaded");
    }
    buttons.forEach((item) => item.addEventListener("click", activeLink));
  }, []);

  return (
    <article className="logos-catalog">
      <h1 className="logos-title">
        {language === "en" ? "Downloadable logos" : "Логотипи"}
      </h1>
      <div className="logos-wrapper">
        <div className="logo-box">
          <img src={sgostuSvg} alt="СГОСТУ" className="logo" />
          <div className="logos-download">
            <a href={sgostuPng} download className={`logo-download-link`}>
              PNG
              <DownloadBtn />
            </a>
            <a href={sgostuSvg} download className={`logo-download-link`}>
              SVG
              <DownloadBtn />
            </a>
          </div>
        </div>
        <div className="logo-box">
          <img src={ukraineSvg} alt="СГОСТУ" className="logo" />
          <div className="logos-download">
            <a href={ukrainePng} download className={`logo-download-link`}>
              PNG
              <DownloadBtn />
            </a>
            <a href={ukraineSvg} download className={`logo-download-link`}>
              SVG
              <DownloadBtn />
            </a>
          </div>
        </div>
        <div className="logo-box">
          <img src={spartakSvg} alt="СГОСТУ" className="logo" />
          <div className="logos-download">
            <a href={spartakPng} download className={`logo-download-link`}>
              PNG
              <DownloadBtn />
            </a>
            <a href={spartakSvg} download className={`logo-download-link`}>
              SVG
              <DownloadBtn />
            </a>
          </div>
        </div>
      </div>
      {/* {logos
        // .filter((logoLink) => logoLink.includes(logoTypes))
        .map((logoLink) => (
          <Logo logo={logoLink} />
        ))} */}
    </article>
  );
}

function DownloadBtn() {
  return (
    <div id="btn-download">
      <svg width="22px" height="16px" viewBox="0 0 22 16">
        <path
          d="M2,10 L6,13 L12.8760559,4.5959317 C14.1180021,3.0779974 16.2457925,2.62289624 18,3.5 L18,3.5 C19.8385982,4.4192991 21,6.29848669 21,8.35410197 L21,10 C21,12.7614237 18.7614237,15 16,15 L1,15"
          id="check"
        ></path>
        <polyline points="4.5 8.5 8 11 11.5 8.5" className="svg-out"></polyline>
        <path d="M8,1 L8,11" className="svg-out"></path>
      </svg>
    </div>
  );
}
