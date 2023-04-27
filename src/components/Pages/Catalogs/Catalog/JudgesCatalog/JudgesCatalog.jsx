import JudgesSearchBar from "./JudgesSearchBar/JudgesSearchBar";
import Loader from "../../../../Loader/Loader";
import JudgeCard from "./JudgeCard/JudgeCard";
import { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";

export default function JudgesCatalog({ judgeClasses, judges }) {
  const [judgesList, setJudgesList] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(judges);
  useEffect(() => {
    if (judges.length !== 0) {
      setJudgesList(judges);
      setLoading(false);
    }
  }, [judges]);

  return (
    <div className="judges-catalog">
      <h1 className="catalog-title">Судді</h1>
      <SearchBar
        setJudgesList={setJudgesList}
        judgeClasses={judgeClasses}
        judgesList={judgesList}
        loading={loading}
        judges={judges}
      />
      <div className="catalog-wrapper">
        {judgesList.length !== 0 ? (
          judgesList.map((judge) => (
            <JudgeCard classes={judgeClasses} judge={judge} key={judge.id} />
          ))
        ) : !loading && judges.length !== 0 && judgesList.length === 0 ? (
          <>
            {window.scrollTo(0, 0)}
            <h1 className="no-dancers-searched">
              По вашому запиту нічого не знайдено 😐
            </h1>
          </>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}
