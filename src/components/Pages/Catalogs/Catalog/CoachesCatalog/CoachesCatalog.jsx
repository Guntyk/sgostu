import CoachesSearchBar from "./CoachesSearchBar/CoachesSearchBar";
import Loader from "../../../../Loader/Loader";
import CoachCard from "./CoachCard/CoachCard";
import { useState, useEffect } from "react";

export default function CoachesCatalog({ coaches, clubs }) {
  const [coachesList, setCoachesList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (coaches.length !== 0) {
      setCoachesList(coaches);
      setLoading(false);
    }
  }, [coaches]);

  return (
    <>
      <h1 className="catalog-title">Тренери</h1>
      <CoachesSearchBar
        setCoachesList={setCoachesList}
        coachesList={coachesList}
        coaches={coaches}
        clubs={clubs}
      />
      <div className="catalog-wrapper">
        {coachesList.length !== 0 ? (
          coachesList.map((coach) => (
            <CoachCard clubs={clubs} coach={coach} key={coach.id} />
          ))
        ) : !loading && coaches.length !== 0 && coachesList.length === 0 ? (
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
    </>
  );
}
