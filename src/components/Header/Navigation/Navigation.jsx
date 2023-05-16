import { Link } from "react-router-dom";
import gsap, { Back } from "gsap";
import { useState } from "react";
import "./Navigation.css";
import { useEffect } from "react";

export default function Navigation({ openSideMenu, setOpenSideMenu }) {
  const [openDropDown, setOpenDropDown] = useState(false);
  const language = window.localStorage.getItem("language");
  const navTimeline = gsap.timeline({ repeat: 0, repeatDelay: 1 });
  gsap.config({ nullTargetWarn: false });

  useEffect(() => {
    if (openSideMenu) {
      navTimeline.to(".navigation", {
        zIndex: 5,
        duration: 0.01,
      });
      navTimeline.to(".navigation", {
        duration: 0.5,
        opacity: 1,
      });
      navTimeline.to(".nav-line", {
        width: "100%",
        stagger: 0.1,
      });
      navTimeline.to(
        ".nav-link",
        {
          width: "80%",
          duration: 0.7,
          opacity: 1,
          ease: Back.easeOut.config(0.8),
          stagger: 0.15,
        },
        "-=0.7"
      );
      navTimeline.to(
        ".header",
        {
          y: -100,
          duration: 0.5,
          ease: "Power1.easeIn",
        },
        "-=1"
      );
      navTimeline.to(
        ".cross",
        {
          delay: 1,
          opacity: 1,
          rotate: 90,
        },
        "-=2"
      );
      navTimeline.to(
        ".cross-line",
        {
          scale: 1,
        },
        "-=2"
      );
      navTimeline.to(".nav-link", {
        transition: 0.2,
      });
      navTimeline.to(".nav-wrapper", {
        pointerEvents: "all",
      });
    } else {
      navTimeline.to(".nav-wrapper", {
        pointerEvents: "none",
      });
      navTimeline.to(
        ".nav-link",
        {
          transition: 0,
        },
        "-=0.5"
      );
      navTimeline.to(
        ".cross",
        {
          duration: 0.5,
          opacity: 0,
          rotate: -90,
          ease: "Power2.easeIn",
        },
        "-=0.5"
      );
      navTimeline.to(
        ".cross-line",
        {
          duration: 0.5,
          scale: 0,
          ease: "Power2.easeIn",
        },
        "-=0.5"
      );
      navTimeline.to(
        ".nav-link",
        {
          width: "200%",
          duration: 0.5,
          opacity: 0,
          ease: "Power1.easeIn",
          stagger: {
            from: "end",
            each: 0.15,
          },
        },
        "-=0.5"
      );
      navTimeline.to(
        ".nav-line",
        {
          width: 0,
        },
        "-=0.5"
      );
      navTimeline.to(".navigation", {
        duration: 0.5,
        opacity: 0,
      });
      navTimeline.to(".navigation", {
        zIndex: -10,
        duration: 0.01,
      });
      navTimeline.to(".header", {
        y: 0,
        duration: 0.5,
        ease: "Power1.easeOut",
      });
    }
  }, [openSideMenu, openSideMenu]);

  function closeNav() {
    setOpenDropDown(false);
    setOpenSideMenu(false);
  }

  return (
    <section className={`navigation ${openSideMenu && "active"}`}>
      <div className="cross-wrapper">
        <div
          className={`cross ${openSideMenu ? "active" : ""}`}
          onClick={closeNav}
        >
          <span className="cross-line"></span>
          <span className="cross-line"></span>
        </div>
      </div>
      <ul className="nav-wrapper">
        <li className="nav-category">
          <Link className="nav-link" to="/" onClick={closeNav}>
            <span className="nav-link-name">
              {language === "en" ? "Home" : "Головна"}
            </span>
            <span className="nav-link-number">01</span>
          </Link>
          <hr className="nav-line" />
        </li>
        <li className="nav-category">
          <Link className="nav-link" to="/news" onClick={closeNav}>
            <span className="nav-link-name">
              {language === "en" ? "News" : "Новини"}
            </span>
            <span className="nav-link-number">02</span>
          </Link>
          <hr className="nav-line" />
        </li>
        <li className={`nav-category ${openDropDown && "opened"}`}>
          <span
            className={`nav-link nav-link-list ${openDropDown && "opened"}`}
            onClick={() => {
              setOpenDropDown(!openDropDown);
            }}
          >
            <span className="nav-link-name">
              {language === "en" ? "About" : "Про нас"}
            </span>
            <span className="nav-link-number">03</span>
          </span>
          <ul className={`nav-list-drop-down ${openDropDown && "opened"}`}>
            <div className="nav-indicator"></div>
            <li className="nav-link-drop-down">
              <Link to="/documents" onClick={closeNav}>
                <span className="nav-link-name">
                  {language === "en" ? "Documents" : "Документи"}
                </span>
              </Link>
              {/* <hr className="nav-line" /> */}
            </li>
            <li className="nav-link-drop-down">
              <Link to="/management" onClick={closeNav}>
                <span className="nav-link-name">
                  {language === "en" ? "Management" : "Керівництво"}
                </span>
              </Link>
            </li>
            <li className="nav-link-drop-down">
              <Link to="/about" onClick={closeNav}>
                <span className="nav-link-name">
                  {language === "en" ? "History" : "Історія"}
                </span>
              </Link>
            </li>
            <li className="nav-link-drop-down">
              <Link to="/logos" onClick={closeNav}>
                <span className="nav-link-name">
                  {language === "en" ? "Logos" : "Логотипи"}
                </span>
              </Link>
            </li>
            <li className="nav-link-drop-down">
              <Link to="/contacts" onClick={closeNav}>
                <span className="nav-link-name">
                  {language === "en" ? "Contacts" : "Контакти"}
                </span>
              </Link>
              {/* <hr className="nav-line" /> */}
            </li>
          </ul>
          <hr className="nav-line" />
        </li>
        <li className="nav-category">
          <Link className="nav-link" to="/catalogs" onClick={closeNav}>
            <span className="nav-link-name">
              {language === "en" ? "Catalogs" : "Каталоги"}
            </span>
            <span className="nav-link-number">04</span>
          </Link>
          <hr className="nav-line" />
        </li>
        <li className="nav-category">
          <Link className="nav-link" to="/calendar" onClick={closeNav}>
            <span className="nav-link-name">
              {language === "en" ? "Calendar" : "Календар"}
            </span>
            <span className="nav-link-number">05</span>
          </Link>
          <hr className="nav-line" />
        </li>
        <li className="nav-category">
          <Link className="nav-link" to="/feedback" onClick={closeNav}>
            <span className="nav-link-name">
              {language === "en" ? "Feedback" : "Зворотній зв'язок"}
            </span>
            <span className="nav-link-number">06</span>
          </Link>
        </li>
      </ul>
    </section>
  );
}
