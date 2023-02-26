import Button from "../../../../common/Button/Button";
import ddb_logo from "../../../../materials/img/ddb_logo.png";
import phone from "../../../../materials/img/phone.png";
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
          <Button buttonText="Приєднатися" className="database-btn" />
        </div>
        {/* <div className="img-wrapper">
          <img src={phone} alt="Phone" />
          <img src={ddb_logo} alt="Dance Database Logo" />
        </div> */}
      </div>
    </article>
  );
}
