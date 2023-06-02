import clubPlaceholder from "../../../../../../materials/icons/clubcard/club-placeholder.jpg";
import { Link, useHistory } from "react-router-dom";
import "../../Catalog.css";
import "./ClubCard.css";

export default function ClubCard({ club, dancers, coaches, screenWidth }) {
  const language = window.localStorage.getItem("language");
  const { push } = useHistory();
  function handleClick() {
    if (screenWidth <= 840) {
      push(`/catalogs/clubs/${club.id}`);
    }
  }
  // Fields filling
  function clubDancers() {
    const clubDancers = club["Dancers ok*"]?.filter((dancer) =>
      dancers.map((dancer) => dancer.id).includes(dancer)
    );
    return clubDancers === [] || clubDancers === undefined
      ? undefined
      : clubDancers.length;
  }
  function clubCoaches() {
    const clubCoaches = club["Coaches ok"]?.filter((coach) =>
      coaches.map((coach) => coach.id).includes(coach)
    );
    return clubCoaches === [] || clubCoaches === undefined
      ? undefined
      : clubCoaches.length;
  }

  return (
    <div className="catalog-card club-card" onClick={handleClick}>
      <div className="img-wrapper">
        {club["Logo Clubs"]?.url ? (
          <img
            className="club-card-img"
            src={club["Logo Clubs"]?.url}
            alt="Логотип"
          />
        ) : (
          <img
            className="club-avatar-placeholder"
            src={clubPlaceholder}
            alt="Логотип клубу"
          />
        )}
      </div>
      <div className="card-inner">
        <p className="card-city">
          {club["Club Name"].includes("(")
            ? club["Club Name"].split("(")[1].trim().slice(0, -1)
            : "Не вказано"}
        </p>
        <h4 className="card-name">{club["Club Name"].split("(")[0].trim()}</h4>
        <span className="card-club-owner">
          {club["SurName of Supervisor"]} {club["Name of Supervisor"]}
        </span>
      </div>
      <div className="card-stats">
        <span className="coaches-quantity">
          {clubCoaches() ? clubCoaches() : "—"}
        </span>
        <span className="dancers-quantity">
          {clubDancers() ? clubDancers() : "—"}
        </span>
      </div>
      <Link className="card-details" to={`/catalogs/clubs/${club.id}`}>
        {language === "en" ? "More" : "Детальніше"}
      </Link>
    </div>
  );
}
