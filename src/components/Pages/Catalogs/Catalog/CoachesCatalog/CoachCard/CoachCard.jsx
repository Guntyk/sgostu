import AvatarPlaceholder from "../../../../../../common/AvatarPlaceholder/AvatarPlaceholder";
import { Link, useParams } from "react-router-dom";
import "./CoachCard.css";
import "../../Catalog.css";

export default function CoachCard({ coach, clubs }) {
  const { catalogs } = useParams();
  return (
    <div className="catalog-card coach-card">
      <div className="img-wrapper">
        {coach["Coach Foto"]?.url ? (
          <img src={coach["Coach Foto"]?.url} alt="Аватар" />
        ) : (
          <AvatarPlaceholder />
        )}
      </div>
      <h5 className="card-name">
        {coach["Coach Name"].trim()} {coach["Coach Surname"].trim()}
      </h5>
      <span className="coach-club">
        {String(
          clubs
            .filter((club) => club.id === Number(coach.Club))
            .map((club) => club.Club_Name)
        )
          .split("(")[0]
          .trim()}
      </span>
      <div className="card-stats">
        <span className="dancers-quantity">
          {coach["Dancers-"]?.length || "—"}
        </span>
      </div>
      <Link className="card-details" to={`/catalogs/coaches/${coach.id}`}>
        Детальніше
      </Link>
    </div>
  );
}
