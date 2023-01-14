import { Link } from "react-router-dom";
import "./Navigation.css";

export default function Navigation({ openSideMenu }) {
  return (
    <section className={`navigation ${openSideMenu ? "active" : ""}`}>
        <div className="nav-wrapper">
          <ul className="nav-column">
            <li className="nav-link">
              <Link to="/">Головна</Link>
            </li>
            <li className="nav-link">
              <Link to="/calendar">Календарь змагань</Link>
            </li>
            <li className="nav-link">
              <Link to="/">Контакти</Link>
            </li>
            <li className="nav-link">
              <Link to="/">Зворотій зв'язок</Link>
            </li>
          </ul>
          <div className="nav-column"></div>
        </div>
    </section>
  );
}
