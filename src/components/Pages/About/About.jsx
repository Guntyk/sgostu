import BackButton from "../../../common/BackButton/BackButton";
import aboutImg from "../../../materials/img/about.png";
import { useEffect, useState } from "react";
import Loader from "../../Loader/Loader";
import "./About.css";

export default function About() {
  const language = window.localStorage.getItem("language");
  const [history, setHistory] = useState();
  window.scrollTo(0, 0);
  useEffect(() => {
    fetch("https://sgostu-backend.download/api/history")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setHistory(data.data.attributes);
      });
  }, []);
  return (
    <article className="about-page">
      <div className="container">
        <BackButton />
        <h2 className="about-page-title">
          {language === "en" ? "About" : "Про нас"}
        </h2>
        <div className="about-page-content">
          <div className="about-content-wrapper">
            <div className="about-content-head">
              <hr />
              <h3 className="about-content-title">
                {language === "en" ? "History" : "Історія"}
              </h3>
            </div>
            {history ? (
              language === "en" ? (
                <p className="about-content-text">{history.text_en}</p>
              ) : (
                <p className="about-content-text">{history.text}</p>
              )
            ) : (
              <Loader />
            )}
          </div>
          <img className="about-img" src={aboutImg} alt="" />
        </div>
      </div>
    </article>
  );
}
