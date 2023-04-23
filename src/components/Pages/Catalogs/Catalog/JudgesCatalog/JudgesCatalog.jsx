import Input from "../../../../../common/Input/Input";
import Loader from "../../../../Loader/Loader";
import JudgeCard from "./JudgeCard/JudgeCard";

export default function JudgesCatalog({ judgeClasses, statuses, judges }) {
  return (
    <>
      <h1 className="catalog-title">Судді</h1>
      <Input inputClassName="catalog-search" placeholderText="Пошук" />
      <div className="catalog-wrapper">
        {judges.length !== 0 ? (
          judges
            .filter((judge) => judge["Judges Verify"])
            .map((judge) => (
              <JudgeCard classes={judgeClasses} judge={judge} key={judge.id} />
            ))
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
}
