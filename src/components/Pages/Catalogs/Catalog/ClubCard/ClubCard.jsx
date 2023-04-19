import "./ClubCard.css";

export default function ClubCard({ club }) {
  return (
    <div className="card-wrapper">
      <img className="club-card-img" src={club.Logo_Clubs?.url} alt="Логотип" />
      <p className="club-card-city">
        {club.Club_Name.split("(")[1].trim().slice(0, -1)}
      </p>
      <h4 className="club-card-title">{club.Club_Name.split("(")[0].trim()}</h4>
      <span className="club-card-owner">
        {club["Name of Supervisor"]} {club["SurName of Supervisor"]}
      </span>
      <div className="club-card-stats">
        <span className="coaches-quantity">
          {club["Name Coach Club"]?.split(",").length || "—"}
        </span>
        <span className="dancers-quantity">{club.Dancers?.length || "—"}</span>
      </div>
      <a href="#" className="club-cards-details-link">
        Детальніше
      </a>
    </div>
  );
}
