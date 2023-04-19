import { Link } from "react-router-dom";
import "./Catalogs.css";

export default function Catalogs() {
  return (
    <section className="catalogs">
      <div className="container">
        <h1 className="catalogs-title">Каталоги</h1>
        <div className="catalogs-wrapper">
          <Link to="/catalogs/dancers" className="catalogs-card">
            Танцюристи
          </Link>
          <Link to="/catalogs/coaches" className="catalogs-card">
            Тренера
          </Link>
          <Link to="/catalogs/clubs" className="catalogs-card">
            Клуби
          </Link>
          <Link to="/catalogs/judges" className="catalogs-card">
            Судді
          </Link>
        </div>
      </div>
    </section>
  );
}
