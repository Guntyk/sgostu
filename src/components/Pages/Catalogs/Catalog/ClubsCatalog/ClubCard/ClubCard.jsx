import AvatarPlaceholder from "../../../../../../common/AvatarPlaceholder/AvatarPlaceholder";
import "./ClubCard.css";

export default function ClubCard({ club }) {
  return (
    <div className="card-wrapper">
      <div className="img-wrapper">
        {club.Logo_Clubs?.url ? (
          <img
            className="club-card-img"
            src={club.Logo_Clubs?.url}
            alt="Логотип"
          />
        ) : (
          <AvatarPlaceholder />
        )}
      </div>
      <div className="card-inner">
        <p className="club-card-city">
          {club.Club_Name.split("(")[1].trim().slice(0, -1)}
        </p>
        <h4 className="club-card-title">
          {club.Club_Name.split("(")[0].trim()}
        </h4>
        <span className="club-card-owner">
          {club["SurName of Supervisor"]} {club["Name of Supervisor"]}
        </span>
      </div>

      <div className="club-card-stats">
        <span className="coaches-quantity">
          {club["Name Coach Club"]?.split(",").length || "—"}
        </span>
        <span className="dancers-quantity">
          {club["Dancers-"]?.length || "—"}
        </span>
      </div>
      <a href="#" className="club-cards-details-link">
        Детальніше
      </a>
    </div>
  );
}
