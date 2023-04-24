import AvatarPlaceholder from "../../../../../../common/AvatarPlaceholder/AvatarPlaceholder";
import { dateToLocalFormat } from "../../../../../../helpers/dateToLocalFormat";
import { Link, useParams } from "react-router-dom";
import "./DancerCard.css";

export default function DancerCard({ dancer, clubs, classes }) {
  const { catalogs } = useParams();
  return (
    <div className="card-wrapper dancer-card">
      <div className="img-wrapper">
        {dancer.Dancer_Foto?.url ? (
          <img
            className="dancer-img"
            src={dancer.Dancer_Foto?.url}
            alt="Аватар"
          />
        ) : (
          <AvatarPlaceholder />
        )}
      </div>
      <div className="name-club">
        <h5 className="dancer-name">
          {dancer.D_Surname.trim()} <br /> {dancer.D_Name.trim()}
        </h5>
        <span className="dancer-club">
          {String(
            clubs
              .filter((club) => club.id === Number(dancer["Club-"]))
              .map((club) => club.Club_Name)
          )
            .split("(")[0]
            .trim()}
        </span>
      </div>
      <div className="class-birth">
        <span className="dancer-class">
          {classes
            .filter(
              (danceClass) =>
                classes.indexOf(danceClass) + 1 ===
                Number(dancer["Dancer Class"].at(-1))
            )
            .at(-1)
            .Class_Name.trim()}
        </span>
        <span className="dancer-birthday">
          {dancer.Birthday && dateToLocalFormat(dancer.Birthday)}
        </span>
      </div>
      <Link
        className="dancer-details"
        to={`/catalogs/${catalogs}/${dancer.id}`}
      >
        Детальніше
      </Link>
    </div>
  );
}
