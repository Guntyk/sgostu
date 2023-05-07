import { Link } from "react-router-dom";
import "./Catalogs.css";

export default function Catalogs() {
  const language = window.localStorage.getItem("language");
  return (
    <section className="catalogs">
      <div className="container">
        <h1 className="catalogs-title">
          {language === "ua" ? "Каталоги" : "Catalogs"}
        </h1>
        <div className="catalogs-wrapper">
          <Link to="/catalogs/dancers" className="catalogs-card">
            {language === "ua" ? "Танцюристи" : "Dancers"}
          </Link>
          <Link to="/catalogs/coaches" className="catalogs-card">
            {language === "ua" ? "Тренера" : "Coaches"}
          </Link>
          <Link to="/catalogs/clubs" className="catalogs-card">
            {language === "ua" ? "Клуби" : "Clubs"}
          </Link>
          <Link to="/catalogs/judges" className="catalogs-card">
            {language === "ua" ? "Судді" : "Judges"}
          </Link>
        </div>
      </div>
    </section>
  );
}
