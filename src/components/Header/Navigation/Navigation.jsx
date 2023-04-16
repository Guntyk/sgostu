import { Link } from "react-router-dom";
import "./Navigation.css";
import gsap, { Back } from "gsap";

export default function Navigation({ openSideMenu, setOpenSideMenu }) {
  const navTimeline = gsap.timeline({ repeat: 0, repeatDelay: 1 });
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
        translateX: "10%",
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
      pointerEvents: "all",
    });
  } else {
    navTimeline.to(".nav-link", {
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
        width: "300%",
        translateX: "-20%",
        duration: 0.5,
        opacity: 0,
        ease: "Power1.easeIn",
        stagger: {
          from: "end",
          each: 0.15,
        },
      },
      "-=0.3"
    );
    navTimeline.to(".nav-line", {
      width: 0,
    });
    navTimeline.to(
      ".navigation",
      {
        duration: 0.5,
        opacity: 0,
      },
      "-=0.2"
    );
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
  return (
    <section className={`navigation ${openSideMenu && "active"}`}>
      <div className="cross-wrapper">
        <div
          className={`cross ${openSideMenu ? "active" : ""}`}
          onClick={() => {
            setOpenSideMenu(false);
          }}
        >
          <span className="cross-line"></span>
          <span className="cross-line"></span>
        </div>
      </div>
      <div className="nav-wrapper">
        <Link
          className="nav-link"
          to="/"
          onClick={() => {
            setOpenSideMenu(false);
          }}
        >
          <span className="nav-link-name">
            {language === "ua" ? "Головна" : "Home Page"}
          </span>
          <span className="nav-link-number">01</span>
        </Link>
        <hr className="nav-line" />
        <Link
          className="nav-link"
          to="/news"
          onClick={() => {
            setOpenSideMenu(false);
          }}
        >
          <span className="nav-link-name">
            {language === "ua" ? "Новини" : "News"}
          </span>
          <span className="nav-link-number">02</span>
        </Link>
        <hr className="nav-line" />
        <Link
          className="nav-link"
          to="/calendar"
          onClick={() => {
            setOpenSideMenu(false);
          }}
        >
          <span className="nav-link-name">
            {language === "ua"
              ? "Календар змагань"
              : "Calendar of competitions"}
          </span>
          <span className="nav-link-number">03</span>
        </Link>
        <hr className="nav-line" />
        <Link
          className="nav-link"
          to="/contacts"
          onClick={() => {
            setOpenSideMenu(false);
          }}
        >
          <span className="nav-link-name">
            {language === "ua" ? "Контакти" : "Contacts"}
          </span>
          <span className="nav-link-number">04</span>
        </Link>
        <hr className="nav-line" />
        <Link
          className="nav-link"
          to="/feedback"
          onClick={() => {
            setOpenSideMenu(false);
          }}
        >
          <span className="nav-link-name">
            {language === "ua" ? "Зворотній зв'язок" : "Feedback"}
          </span>
          <span className="nav-link-number">05</span>
        </Link>
      </div>
    </section>
  );
}
