import { Link } from "react-router-dom";
import "./Catalog.css";

export default function Catalog() {
  return (
    <section className="catalogs">
      <div className="container">
        <h1 className="catalogs-title">Каталоги</h1>
        <div className="catalogs-wrapper">
          <Link to="/catalog/dancers" className="catalogs-card">
            Танцюристи
          </Link>
          <Link to="/catalog/coaches" className="catalogs-card">
            Тренера
          </Link>
          <Link to="/catalog/clubs" className="catalogs-card">
            Клуби
          </Link>
          <Link to="/catalog/judges" className="catalogs-card">
            Судді
          </Link>
        </div>
      </div>
    </section>
  );
}
