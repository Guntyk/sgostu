import AvatarPlaceholder from "../../../../../../common/AvatarPlaceholder/AvatarPlaceholder";
import { Link } from "react-router-dom";
// import "./JudgeCard.css";
import "../../Catalog.css";

export default function JudgeCard({ judge, classes }) {
  return (
    <div className="catalog-card judge-card">
      <div className="img-wrapper">
        {judge["Foto Judges"]?.url ? (
          <img src={judge["Foto Judges"]?.url} alt="Аватар" />
        ) : (
          <AvatarPlaceholder />
        )}
      </div>

      <h5 className="dancer-name">
        {String(judge["Name Surname"]).replace(/ /g, "").trim()}
      </h5>
      <span className="judge-class">
        Категорія:{" "}
        {classes
          .filter(
            (judgeClass) =>
              classes.indexOf(judgeClass) + 1 ===
              Number(judge["Category Judge"].at(-1))
          )
          .at(-1)
          .Category.trim()}
      </span>

      <Link className="judge-details" to={`./judges/${judge.id}`}>
        Детальніше
      </Link>
    </div>
  );
}
