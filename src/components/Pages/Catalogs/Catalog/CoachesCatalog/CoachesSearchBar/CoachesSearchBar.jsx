import Search from "../../../../../../materials/icons/Search";
import Button from "../../../../../../common/Button/Button";
import "./CoachesSearchBar.css";

export default function CoachesSearchBar({
  setCoachesList,
  coachesList,
  coaches,
  loading,
  clubs,
}) {
  console.log(coaches);
  const filterCoaches = (nameValue, clubValue) => {
    // Returning all coaches if fields are empty
    if (!nameValue && !clubValue) {
      return coaches;
    }
    // Copying coaches for filtering
    let list = [...coaches];
    // Filtering by name
    if (nameValue) {
      list = list.filter((coach) =>
        coach["Name Surname Coach"].toLowerCase().includes(nameValue)
      );
    }
    // Filtering by club
    if (clubValue) {
      list = list.filter((coach) => coach.Club?.includes(Number(clubValue)));
    }
    return list;
  };

  function handleSearch(e) {
    e.preventDefault();
    setCoachesList(
      filterCoaches(
        e.target.name.value?.toLowerCase().trim() || null,
        e.target.club?.value === "choose" ? null : e.target.club.value
      )
    );
    window.scrollTo(0, 0);
    // Reset values
    e.target.name.value = "";
    e.target.club.value = "choose";
  }

  return (
    <div className="container search-form">
      <form className="form" onSubmit={handleSearch}>
        <input
          className="input search-input"
          placeholder="Ім'я або прізвище тренера"
          name="name"
        />
        <select
          name="club"
          className="search-select club-select"
          defaultValue="choose"
        >
          <option className="club-option" value="choose" disabled>
            Клуб
          </option>
          {clubs.map((club) => (
            <option className="club-option" value={club.id} key={club.id}>
              {club.Club_Name.split("(")[0].trim()}
            </option>
          ))}
        </select>
        <Button
          className="btn-primary search-btn"
          buttonText={<Search />}
          type="submit"
        />
      </form>
      {!loading && coaches.length > coachesList.length && (
        <Button
          className="reset-filters-btn"
          buttonText="Скинути фільтри"
          onClick={() => {
            setCoachesList(coaches);
          }}
        />
      )}
    </div>
  );
}
