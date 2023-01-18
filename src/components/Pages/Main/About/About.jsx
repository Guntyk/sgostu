import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useHistory } from "react-router-dom";
import Button from "../../../../common/Button/Button";
import "./About.css";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const { push } = useHistory();
  gsap.fromTo(
    ".circular",
    {
      x: 600,
    },
    {
      x: 0,
      duration: 1,
      scrollTrigger: {
        trigger: ".circular",
        scrub: 3,
        // markers: true,
        // start: "+=100px",
        end: "+=500px",
        toggleActions: "restart none none none"
      },
    }
  );

  return (
    <article className="about">
      <div className="container">
        <div className="about-wrapper">
          <div className="about-text">
            <div className="about-row">
              <span>СГОСТУ</span>
              <hr />
            </div>
            <p>
              Це одна з наймасовіших громадських організацій спортивного танцю
              України. Існує понад 20 років, має представництва у більшості
              регіонів та областей. Пріоритети - це автоматизація процесів,
              командна робота, сучасний підхід. Наша організація - частина
              танцювального світу, який ми робимо кращим!
            </p>
          </div>
          <div className="circular">
            <svg viewBox="0 0 100 100" className="rounded-text">
              <path d="M 0,50 a 50,50 0 1,1 0,1 z" fill="none" id="circle" />
              <text className="about-btn-text">
                <textPath href="#circle">
                  Про нас Про нас Про нас Про нас Про нас Про нас Про нас Про
                  нас
                </textPath>
              </text>
            </svg>
            <Button
              className="about-btn"
              buttonText="Більше"
              onClick={() => {
                push("/404");
              }}
            />
          </div>
        </div>
      </div>
    </article>
  );
}
