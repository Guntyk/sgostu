import ddb_logo from "../../../../materials/img/ddb_logo.png";
import phone from "../../../../materials/img/phone.svg";
import { ScrollTrigger } from "gsap/all";
import { useEffect } from "react";
import { gsap } from "gsap";
import "./Database.css";

gsap.registerPlugin(ScrollTrigger);

export default function Database() {
  const language = window.localStorage.getItem("language");
  useEffect(() => {
    gsap.from(".database-phone", {
      y: 300,
      duration: 0.8,
      scrollTrigger: {
        trigger: ".database",
        start: "100px 105%",
        toggleActions: "restart pause resume pause",
      },
    });
    gsap.from(".database-logo", {
      y: 300,
      duration: 1,
      delay: 0.5,
      scrollTrigger: {
        trigger: ".database",
        start: "150px 105%",
        toggleActions: "restart pause resume pause",
      },
    });
  }, []);
  return (
    <article className="database">
      <div className="database-wrapper">
        <div className="database-text">
          <h3 className="database-title">
            {language === "en" ? "SGOSTU database" : "База даних СГОСТУ"}
          </h3>
          <p className="database-description">
            {language === "en"
              ? "Clubs, Trainers, Judges, Dancers"
              : "Клуби, Тренери, Судді, Танцюристи"}
          </p>
          <a
            className="btn database-btn"
            href="https://app.database.dance"
            target="_blank"
            rel="norefferer noopener"
          >
            {language === "en" ? "Join" : "Приєднатися"}
          </a>
        </div>
        <div className="img-wrapper">
          <img src={phone} alt="Phone" className="database-phone" />
          <img
            src={ddb_logo}
            alt="Dance Database Logo"
            className="database-logo"
          />
        </div>
      </div>
    </article>
  );
}
