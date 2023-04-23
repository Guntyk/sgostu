import Input from "../../../../../common/Input/Input";
import Loader from "../../../../Loader/Loader";
import CoachCard from "./CoachCard/CoachCard";

export default function CoachesCatalog({ statuses, coaches, clubs }) {
  return (
    <>
      <h1 className="catalog-title">Тренери</h1>
      <Input inputClassName="catalog-search" placeholderText="Пошук" />
      <div className="catalog-wrapper">
        {coaches.length !== 0 ? (
          coaches
            .slice(1)
            .map((coach) => (
              <CoachCard clubs={clubs} coach={coach} key={coach.id} />
            ))
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
}
