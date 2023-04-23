import AvatarPlaceholder from "../../../../../../common/AvatarPlaceholder/AvatarPlaceholder";
import { Link } from "react-router-dom";
import "./CoachCard.css";

export default function CoachCard({ coach, clubs }) {
  return (
    <div className="card-wrapper coach-card">
      <div className="img-wrapper">
        {coach["Coach Foto"]?.url ? (
          <img src={coach["Coach Foto"]?.url} alt="Аватар" />
        ) : (
          <AvatarPlaceholder />
        )}
      </div>
      <h5 className="dancer-name">
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
      <div className="coach-card-stats">
        <span className="dancers-quantity">{coach.Dancers?.length || "—"}</span>
      </div>
      <Link className="coach-details" to={`./coaches/${coach.id}`}>
        Детальніше
      </Link>
    </div>
  );
}
