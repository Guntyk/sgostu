import AvatarPlaceholder from "../../../../../../common/AvatarPlaceholder/AvatarPlaceholder";
import "./ClubCard.css";
import "../../Catalog.css";

export default function ClubCard({ club }) {
  return (
    <div className="catalog-card club-card">
      <div className="img-wrapper">
        {club["Logo Clubs"]?.url ? (
          <img
            className="club-card-img"
            src={club["Logo Clubs"]?.url}
            alt="Логотип"
          />
        ) : (
          <AvatarPlaceholder />
        )}
      </div>
      <div className="card-inner">
        <p className="card-city">
          {club["Club Name"].split("(")[1].trim().slice(0, -1)}
        </p>
        <h4 className="card-name">{club["Club Name"].split("(")[0].trim()}</h4>
        <span className="card-club-owner">
          {club["SurName of Supervisor"]} {club["Name of Supervisor"]}
        </span>
      </div>

      <div className="card-stats">
        <span className="coaches-quantity">
          {club["Coaches ok"]?.length || "—"}
        </span>
        <span className="dancers-quantity">
          {club["Dancers ok*"]?.length || "—"}
        </span>
      </div>
      <a href="#" className="card-details">
        Детальніше
      </a>
    </div>
  );
}
