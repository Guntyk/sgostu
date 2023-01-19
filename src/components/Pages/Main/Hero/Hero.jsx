import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect } from "react";
import gsap from "gsap";
import "./Hero.css";
gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  useEffect(() => {
    setTimeout(() => {
      gsap.to(".title-stroke", {
        y: 0,
        duration: 0.55,
        onComplete: parallaxText(),
      });
    }, 500);
  }, []);

  function parallaxText() {
    gsap.to(".title", {
      y: -100,
      ease: "linear",
      scrollTrigger: {
        trigger: ".about",
        start: "top bottom",
        end: "+=250px",
        scrub: true
      },
    });
  }

  return (
    <div className="hero">
      <div className="container">
        <div className="hero__wrapper">
          <h1 className="title">
            <div>
              <span className="title-stroke">
                Спілка громадських організацій
              </span>
            </div>
            <div>
              <span className="title-stroke"> спортивного танцю України</span>
            </div>
          </h1>
        </div>
      </div>
      <span className="blur"></span>
    </div>
  );
}
