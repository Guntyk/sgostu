import AvatarPlaceholder from "../../../../../../common/AvatarPlaceholder/AvatarPlaceholder";
import { Link } from "react-router-dom";
import "./JudgeCard.css";
import "../../Catalog.css";

export default function JudgeCard({ judge, classes }) {
  console.log(judge);
  return (
    <div className="catalog-card judge-card">
      <div className="img-wrapper">
        {judge["Foto Judges"]?.url ? (
          <img src={judge["Foto Judges"]?.url} alt="Аватар" />
        ) : (
          <AvatarPlaceholder />
        )}
      </div>

      <h5 className="card-name">
        {String(judge["Name Surname"]).replace(/ /g, "").split(" ")[0]}
        {String(judge["Name Surname"]).replace(/ /g, "").split(" ")[1]}
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

      <Link className="card-details" to={`./judges/${judge.id}`}>
        Детальніше
      </Link>
    </div>
  );
}
