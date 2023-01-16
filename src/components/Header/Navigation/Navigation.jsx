import { Link } from "react-router-dom";
import "./Navigation.css";
import gsap from "gsap";

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
    navTimeline.to(
      ".nav-link",
      {
        translateY: 0,
        duration: 0.6,
        opacity: 1,
        ease: "Power4.easeOut",
        stagger: 0.2,
      },
      "+=.5"
    );
    navTimeline.to(
      ".cross",
      {
        delay: 1,
        opacity: 1,
        rotate: 90,
        scale: 1,
    }, "-=2");
  } else {
    navTimeline.to(".cross", {
      opacity: 0,
      rotate: -90,
      scale: 0.5,
      ease: "Power4.easeIn",
    });
    navTimeline.to(
      ".nav-link",
      {
        translateY: 50,
        duration: 0.5,
        opacity: 0,
        ease: "Power1.easeIn",
        stagger: {
          from: "end",
          each: 0.15,
        },
      },
      "-=.3"
    );
    navTimeline.to(".navigation", {
      duration: 0.5,
      opacity: 0,
    });
    navTimeline.to(".navigation", {
      zIndex: -10,
      duration: 0.01,
    });
  }
  return (
    <section className={`navigation ${openSideMenu ? "active" : ""}`}>
      <div className="nav-wrapper">
        <div className="nav-column">
          <span className="nav-link">
            <Link
              to="/"
              onClick={() => {
                setOpenSideMenu(false);
              }}
            >
              Головна
            </Link>
          </span>
          <span className="nav-link">
            <Link
              to="/calendar"
              onClick={() => {
                setOpenSideMenu(false);
              }}
            >
              Календар змагань
            </Link>
          </span>
          <span className="nav-link">
            <Link
              to="/"
              onClick={() => {
                setOpenSideMenu(false);
              }}
            >
              Контакти
            </Link>
          </span>
          <span className="nav-link">
            <Link
              to="/"
              onClick={() => {
                setOpenSideMenu(false);
              }}
            >
              Зворотній зв'язок
            </Link>
          </span>
        </div>
        <div className="nav-column"></div>
      </div>
    </section>
  );
}
