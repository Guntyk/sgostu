import ddb_logo from "../../../../materials/img/ddb_logo.png";
import phone from "../../../../materials/img/phone.svg";
import "./Database.css";

export default function Database() {
  return (
    <article className="database">
      <div className="database-wrapper">
        <div className="database-text">
          <h3 className="database-title">База даних СГОСТУ</h3>
          <p className="database-description">
            Клуби, Тренери, Судді, Танцюристи
          </p>
          <a
            className="btn database-btn"
            href="https://app.database.dance"
            target="_blank"
            rel="norefferer noopener"
          >
            Приєднатися
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
