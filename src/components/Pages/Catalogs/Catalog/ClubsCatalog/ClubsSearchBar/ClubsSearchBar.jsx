import Search from "../../../../../../materials/icons/Search";
import Button from "../../../../../../common/Button/Button";
import "./ClubsSearchBar.css";

export default function ClubsSearchBar({
  setClubsList,
  clubsList,
  loading,
  regions,
  clubs,
}) {
  const filterClubs = (nameValue, regionValue) => {
    // Returning all clubs if fields are empty
    if (!nameValue && !regionValue) {
      return clubs;
    }
    // Copying clubs for filtering
    let list = [...clubs];
    // Filtering by name
    if (nameValue) {
      list = list.filter((club) =>
        club.Club_Name.toLowerCase().includes(nameValue)
      );
    }
    // Filtering by region
    if (regionValue) {
      list = list.filter((club) =>
        club.Region_Clubs.includes(Number(regionValue))
      );
    }
    return list;
  };

  function handleSearch(e) {
    e.preventDefault();
    setClubsList(
      filterClubs(
        e.target.name.value?.toLowerCase().trim() || null,
        e.target.region?.value === "choose" ? null : e.target.region.value
      )
    );
    // Reset values
    e.target.name.value = "";
    e.target.region.value = "choose";
  }

  return (
    <div className="container search-form">
      <form className="form" onSubmit={handleSearch}>
        <input
          className="input search-input"
          placeholder="Назва клубу"
          name="name"
        />
        <select
          name="region"
          className="search-select region-select"
          defaultValue="choose"
        >
          <option className="region-option" value="choose" disabled>
            Регіон
          </option>
          {regions.map((region) => (
            <option className="region-option" value={region.id} key={region.id}>
              {region.Region_Name.trim()}
            </option>
          ))}
        </select>
        <Button
          className="btn-primary search-btn"
          buttonText={<Search />}
          type="submit"
        />
      </form>
      {!loading && clubs.length > clubsList.length && (
        <Button
          className="reset-filters-btn"
          buttonText="Скинути фільтри"
          onClick={() => {
            setClubsList(clubs);
          }}
        />
      )}
    </div>
  );
}
