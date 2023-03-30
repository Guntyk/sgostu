import { LogoSGOSTU } from "../../common/Logos/Logo-SGOSTU";
import Navigation from "./Navigation/Navigation";
import { useState } from "react";
import "./Header.css";

export default function Header() {
  const [openSideMenu, setOpenSideMenu] = useState(false);
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
                  className={`ham-line stuffing ${
                    openSideMenu ? "active" : ""
                  }`}
                ></span>
                <span
                  className={`ham-line bottom-bun ${
                    openSideMenu ? "active" : ""
                  }`}
                ></span>
              </div>
              <a href="/" className="name">
                <LogoSGOSTU classname="header-logo" />
                <span className="company-name">СГОСТУ</span>
              </a>
            </div>
          </div>
        </div>
      </header>
      <Navigation openSideMenu={openSideMenu} setOpenSideMenu={setOpenSideMenu}/>
    </>
  );
}
