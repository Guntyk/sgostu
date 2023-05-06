import aboutImg from "../../../materials/img/about.png";
import Loader from "../../Loader/Loader";
import { useState } from "react";
import "./About.css";

export default function About() {
  const language = window.localStorage.getItem("language");
  const [history, setHistory] = useState();
  window.scrollTo(0, 0);

  fetch("https://sgostu-backend.download/api/history")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      setHistory(data.data.attributes);
    });
  return (
    <article className="about-page">
      <div className="container">
        <h2 className="about-page-title">
          {language === "ua" ? "Про нас" : "About"}
        </h2>
        <div className="about-page-content">
          <div className="about-content-wrapper">
            <div className="about-content-head">
              <hr />
              <h3 className="about-content-title">
                {language === "ua" ? "Історія" : "History"}
              </h3>
            </div>
            <p className="about-content-text">
              {history ? (
                language === "ua" ? (
                  history.text
                ) : (
                  history.text_en
                )
              ) : (
                <Loader />
              )}
            </p>
          </div>
          <img className="about-img" src={aboutImg} alt="" />
        </div>
      </div>
    </article>
  );
}
