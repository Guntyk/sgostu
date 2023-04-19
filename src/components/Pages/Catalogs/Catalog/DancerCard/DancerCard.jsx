import AvatarPlaceholder from "../../../../../common/AvatarPlaceholder/AvatarPlaceholder";
import { dateToLocalFormat } from "../../../../../helpers/dateToLocalFormat";
import { Link } from "react-router-dom";
import "./DancerCard.css";

export default function DancerCard({ dancer }) {
  return (
    <div className="card-wrapper">
      <div className="img-wrapper">
        {dancer.Dancer_Foto?.url ? (
          <img src={dancer.Dancer_Foto?.url} alt="Аватар" />
        ) : (
          <AvatarPlaceholder />
        )}
      </div>
      <span className="dancer-class">Категорія: </span>
      <h5 className="dancer-name">
        {dancer.D_Surname.trim()} {dancer.D_Name.trim()}
      </h5>
      <span className="dancer-club">{dancer.club}</span>
      <span className="dancer-birthday">
        {dancer.Birthday && dateToLocalFormat(dancer.Birthday)}
      </span>
      <Link className="dancer-details" to={`./dancers/${dancer.id}`}>
        Детальніше
      </Link>
    </div>
  );
}
