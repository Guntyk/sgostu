import { LogoSGOSTU } from "../../common/Logos/Logo-SGOSTU";
import { useState } from "react";
import "./Header.css";
import "../media.css";
export default function Header() {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div
              className="hamburger"
              onClick={() => {
                setOpenSideMenu(!openSideMenu);
              }}
            >
              <span
                className={`top-bun ${openSideMenu ? "active" : ""}`}
              ></span>
              <span
                className={`stuffing ${openSideMenu ? "active" : ""}`}
              ></span>
              <span
                className={`bottom-bun ${openSideMenu ? "active" : ""}`}
              ></span>
            </div>
            <a href="/" className="name">
              <LogoSGOSTU classname="header-logo" />
              <span className="company-name">СГОСТУ</span>
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
