import Input from "../../../../../common/Input/Input";
import Loader from "../../../../Loader/Loader";
import ClubCard from "./ClubCard/ClubCard";

export default function ClubsCatalog({ clubs }) {
  return (
    <>
      <h1 className="catalog-title">Клуби</h1>
      <Input inputClassName="catalog-search" placeholderText="Пошук" />
      <div className="catalog-wrapper">
        {clubs.length !== 0 ? (
          clubs
            .slice(1)
            // .filter((club) => club.Approve_Club)
            .map((club) => <ClubCard club={club} key={club.id} />)
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
}
