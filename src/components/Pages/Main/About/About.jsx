import Button from "../../../../common/Button/Button";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import gsap from "gsap";
import "./About.css";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const language = window.localStorage.getItem("language");
  const { push } = useHistory();
  useEffect(() => {
    gsap.from(".about-line", {
      width: 0,
      duration: 0.7,
      scrollTrigger: {
        trigger: ".about",
        start: "70% bottom",
        toggleActions: "restart pause resume pause",
      },
    });
    gsap.fromTo(
      ".circular",
      {
        x: 600,
      },
      {
        x: 0,
        delay: 0.5,
        duration: 1,
        scrollTrigger: {
          trigger: ".circular",
          toggleActions: "restart pause resume pause",
        },
      }
    );
  }, []);

  return (
    <article className="about">
      <div className="container">
        <div className="about-wrapper">
          <div className="about-text">
            <div className="about-row">
              <span>{language === "en" ? "SGOSTU" : "СГОСТУ"}</span>
              <hr className="about-line" />
            </div>
            <p>
              {language === "en"
                ? `It is one of the largest public organizations of sports dance
                of Ukraine. It has existed for more than 20 years and has representation in the majority
                regions and regions. Priorities are process automation,
                teamwork, modern approach. Our organization is a part
                of the dance world, which we make better!`
                : `Це одна з наймасовіших громадських організацій спортивного танцю України. Існує понад 20 років, має представництва у більшості
              регіонів та областей. Пріоритети - це автоматизація процесів,
              командна робота, сучасний підхід. Наша організація - частина
              танцювального світу, який ми робимо кращим!`}
            </p>
          </div>
          <div className="circular">
            <svg viewBox="0 0 100 100" className="rounded-text">
              <path d="M 0,50 a 50,50 0 1,1 0,1 z" fill="none" id="circle" />
              <text className="about-btn-text">
                <textPath href="#circle">
                  {language === "en"
                    ? "About us About us About us About us About us About us About us"
                    : "Про нас Про нас Про нас Про нас Про нас Про нас Про нас Про нас"}
                </textPath>
              </text>
            </svg>
            <Button
              className="about-btn"
              buttonText={language === "en" ? "More" : "Більше"}
              onClick={() => {
                push("/about");
              }}
            />
          </div>
        </div>
      </div>
    </article>
  );
}
