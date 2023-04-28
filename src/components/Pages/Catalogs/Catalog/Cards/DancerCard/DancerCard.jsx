import AvatarPlaceholder from "../../../../../../common/AvatarPlaceholder/AvatarPlaceholder";
import { dateToLocalFormat } from "../../../../../../helpers/dateToLocalFormat";
import { Link, useHistory } from "react-router-dom";
import "./DancerCard.css";
import "../../Catalog.css";

export default function DancerCard({ dancer, clubs, classes, screenWidth }) {
  const { push } = useHistory();
  const dancerFullName = dancer.D_Surname.trim() + " " + dancer.D_Name.trim();
  const dancerClub = String(
    clubs
      .filter((club) => club.id === Number(dancer["Club-"]))
      .map((club) => club.Club_Name)
  )
    .split("(")[0]
    .trim();

  function handleClick() {
    if (screenWidth <= 840) {
      push(`/catalogs/dancers/${dancer.id}`);
    }
  }

  return (
    <div className="catalog-card dancer-card" onClick={handleClick}>
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
      <div className="card-wrapper">
        <h5 className="card-name">
          {screenWidth <= 840 ? (
            dancerFullName.length > 21 ? (
              dancerFullName.slice(0, 20) + "..."
            ) : (
              dancerFullName
            )
          ) : (
            <>
              {dancer.D_Surname.trim()}
              <br />
              {dancer.D_Name.trim()}
            </>
          )}
        </h5>
        <span className="card-club">
          {screenWidth <= 1150 && screenWidth > 840
            ? dancerClub.length > 15
              ? dancerClub.slice(0, 15) + "..."
              : dancerClub
            : dancerClub}
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
          {dateToLocalFormat(dancer.Birthday)}
        </span>
      </div>
      <Link className="dancer-details" to={`/catalogs/dancers/${dancer.id}`}>
        Детальніше
      </Link>
    </div>
  );
}