import AvatarPlaceholder from "../../../../../common/AvatarPlaceholder/AvatarPlaceholder";
import { dateToLocalFormat } from "../../../../../helpers/dateToLocalFormat";
import { Link } from "react-router-dom";
import "./DancerCard.css";

export default function DancerCard({ dancer }) {
  return (
    <div className="card-wrapper">
      <div className="img-wrapper">
        {dancer.avatar?.url ? (
          <img src={dancer.avatar?.url} alt="Аватар" />
        ) : (
          <AvatarPlaceholder />
        )}
      </div>
      <span className="dancer-class">Категорія: {dancer.class}</span>
      <h5 className="dancer-name">
        {dancer.surname.trim()} {dancer.name.trim()} {dancer.thirdname.trim()}
      </h5>
      <span className="dancer-club">{dancer.club}</span>
      <span className="dancer-birthday">
        {dancer.birthday && dateToLocalFormat(dancer.birthday)}
      </span>
      <Link className="dancer-details" to={`./dancers/${dancer.id}`}>
        Детальніше
      </Link>
    </div>
  );
}
