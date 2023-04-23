import ClubsSearchBar from "./ClubsSearchBar/ClubsSearchBar";
import Loader from "../../../../Loader/Loader";
import { useState, useEffect } from "react";
import ClubCard from "./ClubCard/ClubCard";

export default function ClubsCatalog({ clubs }) {
  const [clubsList, setClubsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (clubs.length !== 0) {
      setClubsList(clubs);
      setLoading(false);
    }
  }, [clubs]);

  return (
    <>
      <h1 className="catalog-title">Клуби</h1>
      <ClubsSearchBar
        setClubsList={setClubsList}
        clubsList={clubsList}
        loading={loading}
        clubs={clubs}
      />
      <div className="catalog-wrapper">
        {clubsList.length !== 0 ? (
          clubsList.map((club) => <ClubCard key={club.id} club={club} />)
        ) : !loading && clubs.length !== 0 && clubsList.length === 0 ? (
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
