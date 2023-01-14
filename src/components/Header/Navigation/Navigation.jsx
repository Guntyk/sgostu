import { Link } from "react-router-dom";
import "./Navigation.css";

export default function Navigation({ openSideMenu }) {
  return (
    <section className={`navigation ${openSideMenu ? "active" : ""}`}>
      <div className="nav-wrapper">
        <div className="nav-column">
          <span className="nav-link">
            <Link to="/">Головна</Link>
          </span>
          <span className="nav-link">
            <Link to="/calendar">Календар змагань</Link>
          </span>
          <span className="nav-link">
            <Link to="/">Контакти</Link>
          </span>
          <span className="nav-link">
            <Link to="/">Зворотній зв'язок</Link>
          </span>
        </div>
        <div className="nav-column"></div>
      </div>
    </section>
  );
}
