import DancersSearchBar from "./DancersSearchBar/DancersSearchBar";
import DancerCard from "./DancerCard/DancerCard";
import Loader from "../../../../Loader/Loader";
import { useState, useEffect } from "react";

export default function DancersCatalog({
  dancerClasses,
  statuses,
  dancers,
  clubs,
}) {
  const [dancersList, setDancersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(false);

  useEffect(() => {
    if (dancers.length !== 0) {
      setDancersList(dancers);
      setLoading(false);
    }
  }, [dancers]);

  return (
    <>
      <h1 className="catalog-title">Танцюристи</h1>
      <DancersSearchBar
        setDancersList={setDancersList}
        dancerClasses={dancerClasses}
        dancersList={dancersList}
        setSearch={setSearch}
        statuses={statuses}
        dancers={dancers}
        loading={loading}
        search={search}
        clubs={clubs}
      />
      <div className="catalog-wrapper">
        {!search && dancersList.length !== 0 ? (
          dancersList.map((dancer) => (
            <DancerCard
              classes={dancerClasses}
              key={dancer.id}
              dancer={dancer}
              clubs={clubs}
            />
          ))
        ) : !loading && dancers.length !== 0 && dancersList.length === 0 ? (
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
