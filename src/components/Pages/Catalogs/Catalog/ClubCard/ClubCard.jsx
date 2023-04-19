import "./ClubCard.css";

export default function ClubCard({ club }) {
  return (
    <div className="club-card">
      <img className="club-card-img" src={club.Logo_Clubs?.url} alt="Логотип" />
      <p className="club-card-city">Київ</p>
      <h4 className="club-card-title">{club.Club_Name}</h4>
      <span className="club-card-owner">
        {club["Name of Supervisor"]} {club["SurName of Supervisor"]}
      </span>
      <div className="club-card-stats">
        <span className="coaches-quantity">{club.Coaches?.length || "—"}</span>
        <span className="dancers-quantity">{club.Dancers?.length || "—"}</span>
      </div>
      <a href="#" className="club-cards-details-link">
        Детальніше
      </a>
    </div>
  );
}
