import { LogoSGOSTU } from "../../common/Logos/Logo-SGOSTU";
import Navigation from "./Navigation/Navigation";
import { Link } from "react-router-dom";
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
              className={`hamburger ${openSideMenu ? "hide" : ""}`}
              onClick={() => {
                setOpenSideMenu(true);
              }}
            >
              <span
                className={`ham-line top-bun ${openSideMenu ? "active" : ""}`}
              ></span>
              <span
                className={`ham-line stuffing ${openSideMenu ? "active" : ""}`}
              ></span>
              <span
                className={`ham-line bottom-bun ${
                  openSideMenu ? "active" : ""
                }`}
              ></span>
            </div>
            <Link to="/" className="name">
              <LogoSGOSTU classname="header-logo" />
              <span className="company-name">СГОСТУ</span>
            </Link>
          </div>
        </div>
      </header>
      <Navigation openSideMenu={openSideMenu} />
    </>
  );
}
