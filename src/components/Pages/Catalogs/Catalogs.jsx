import { Link } from "react-router-dom";
import "./Catalogs.css";

export default function Catalogs() {
  const language = window.localStorage.getItem("language");
  return (
    <section className="catalogs">
      <div className="container">
        <h1 className="catalogs-title">
          {language === "en" ? "Catalogs" : "Каталоги"}
        </h1>
        <div className="catalogs-wrapper">
          <Link to="/catalogs/dancers" className="catalogs-card">
            {language === "en" ? "Dancers" : "Танцюристи"}
          </Link>
          <Link to="/catalogs/coaches" className="catalogs-card">
            {language === "en" ? "Coaches" : "Тренера"}
          </Link>
          <Link to="/catalogs/clubs" className="catalogs-card">
            {language === "en" ? "Clubs" : "Клуби"}
          </Link>
          <Link to="/catalogs/judges" className="catalogs-card">
            {language === "en" ? "Judges" : "Судді"}
          </Link>
        </div>
      </div>
    </section>
  );
}
