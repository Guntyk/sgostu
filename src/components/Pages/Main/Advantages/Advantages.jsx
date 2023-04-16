import { useContext } from "react";
import "./Advantages.css";
import { LanguageContext } from "../../../../App";

export default function Advantages() {
  const { language } = useContext(LanguageContext);

  return (
    <article className="advantages">
      <div className="cards-wrapper">
        <div className="advantage-card">
          {language === "ua" ? "Наші переваги" : "Our advantages"}
        </div>
        <div className="advantage-card">
          {language === "ua"
            ? "Електронні книжки танцюристів"
            : "Electronic books of dancers"}
        </div>
        <div className="advantage-card">
          {language === "ua"
            ? "Присвоєння спортивних розрядів"
            : "Assignment of sports categories"}
        </div>
        <div className="advantage-card">
          {language === "ua"
            ? "Підтримка обласних чемпіонатів"
            : "Support of regional championships"}
        </div>
        <div className="advantage-card">
          {language === "ua"
            ? "Співпраця з організаціями країн Східної Європи"
            : "Cooperation with organizations of Eastern European countries"}
        </div>
        <div className="advantage-card">
          {language === "ua"
            ? "Пільги для танцюристів на турнірах"
            : "Benefits for dancers at tournaments"}
        </div>
        <div className="advantage-card">
          {language === "ua"
            ? "Рекомендації для тренерів, які виїжджають за кордон"
            : "Recommendations for coaches traveling abroad"}
        </div>
        <div className="advantage-card">
          {language === "ua"
            ? "Сайти для великих клубів"
            : "Sites for big clubs"}
        </div>
      </div>
    </article>
  );
}
