import { LogoSGOSTU } from "../../common/Logos/Logo-SGOSTU";
import Navigation from "./Navigation/Navigation";
import { LanguageContext } from "../../App";
import { useContext } from "react";
import { useState } from "react";
import "./Header.css";

export default function Header() {
  const {language, setLanguage} = useContext(LanguageContext);
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [language, setLanguage] = useState("ua");

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__row">
              <div
                className={`hamburger ${openSideMenu && "active"}`}
                onClick={() => {
                  setOpenSideMenu(true);
                }}
              >
                <span
                  className={`ham-line top-bun ${openSideMenu && "active"}`}
                ></span>
                <span
                  className={`ham-line stuffing ${openSideMenu && "active"}`}
                ></span>
                <span
                  className={`ham-line bottom-bun ${openSideMenu && "active"}`}
                ></span>
              </div>
              <a href="/" className="name">
                <LogoSGOSTU classname="header-logo" />
                <span className="company-name">
                  {language === "ua" ? "СГОСТУ" : "SGOSTU"}
                </span>
              </a>
            </div>
            <div className="language">
              <a
                className="ua"
                onClick={() => {
                  setLanguage("ua");
                }}
              >
                UA
              </a>
              <span className="hr"></span>
              <a
                className="en"
                onClick={() => {
                  setLanguage("en");
                }}
              >
                EN
              </a>
            </div>
          </div>
        </div>
      </header>
      <Navigation
        openSideMenu={openSideMenu}
        setOpenSideMenu={setOpenSideMenu}
      />
    </>
  );
}
