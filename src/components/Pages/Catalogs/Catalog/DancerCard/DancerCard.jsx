import AvatarPlaceholder from "../../../../../common/AvatarPlaceholder/AvatarPlaceholder";
import { dateToLocalFormat } from "../../../../../helpers/dateToLocalFormat";
import { Link } from "react-router-dom";
import "./DancerCard.css";

export default function DancerCard({ dancer, clubs, classes }) {
  // console.log(dancer);
  // console.log(classes);
  // console.log(
  //   classes
  //     .map((dancerClass) => dancerClass.Dancers)
  //     .filter((dancerClass) => dancerClass !== undefined)
  //     .map((dancerClass) => dancerClass.includes(Number(dancer.id)))
  //     .map((dancerClass) => includes(Number(dancer.id)))
  //     .map((dancerClass) => dancerClass.includes(String(dancerClass)))
  //     .includes((dancerClass) => dancerClass.includes(Number(dancer.id)))
  //     .indexOf(true)
  // );
  // console.log(
  //   classes.filter(
  //     (danceClass) =>
  //       classes.indexOf(danceClass) + 1 ===
  //       Number(dancer["Dancer Class"].at(-1))
  //   )
  // );
  // console.log(
  //   classes.filter((dancerClass) =>
  //     console.log(dancerClass.Dancers?.includes(dancer["Dancer Class"].at(-1)))
  //   )
  // );
  // console.log(
  // classes.map((dancerClass) => dancerClass.Dancers)
  // .filter((dancerClass) => dancerClass.id === dancer["Dancer Class"].at(-1))
  // );
  // console.log(
  // classes.map((dancerClass) => dancerClass.Dancers)
  // .filter((dancerClass) => dancerClass.id
  // );
  return (
    <div className="card-wrapper">
      <div className="img-wrapper">
        {dancer.Dancer_Foto?.url ? (
          <img src={dancer.Dancer_Foto?.url} alt="Аватар" />
        ) : (
          <AvatarPlaceholder />
        )}
      </div>
      <span className="dancer-class">
        Клас:{" "}
        {classes
          .filter(
            (danceClass) =>
              classes.indexOf(danceClass) + 1 ===
              Number(dancer["Dancer Class"].at(-1))
          )
          .at(-1)
          .Class_Name.trim()}
      </span>
      <h5 className="dancer-name">
        {dancer.D_Surname.trim()} {dancer.D_Name.trim()}
      </h5>
      <span className="dancer-club">
        {String(
          clubs
            .filter((club) => club.id === Number(dancer.Club))
            .map((club) => club.Club_Name)
        )
          .split("(")[0]
          .trim()}
      </span>
      <span className="dancer-birthday">
        {dancer.Birthday && dateToLocalFormat(dancer.Birthday)}
      </span>
      <Link className="dancer-details" to={`./dancers/${dancer.id}`}>
        Детальніше
      </Link>
    </div>
  );
}
