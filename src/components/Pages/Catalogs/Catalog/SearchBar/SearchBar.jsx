import { filterDancers } from "../../../../../helpers/filters/filterDancers";
import Search from "../../../../../materials/icons/Search";
import Button from "../../../../../common/Button/Button";
import "./SearchBar.css";

export default function SearchBar({
  setEntitiesList,
  catalogs,
  regions,
  dancers,
  clubs,
  coaches,
  judges,
  statuses,
  dancerClasses,
  judgeClasses,
}) {
  function handleSearch(e) {
    e.preventDefault();
    window.scrollTo(0, 0);

    const filteringArr =
      catalogs === "dancers"
        ? dancers
        : catalogs === "clubs"
        ? clubs
        : catalogs === "coaches"
        ? coaches
        : catalogs === "judges" && judges;

    const filtersValue = [
      catalogs,
      filteringArr,
      e.target.name.value?.toLowerCase().trim() || null,
      e.target.club
        ? e.target.club.value === "choose"
          ? null
          : e.target.club.value
        : null,
      e.target.class
        ? e.target.class.value === "choose"
          ? null
          : e.target.class.value
        : null,
      e.target.status
        ? e.target.status.value === "choose"
          ? null
          : e.target.status.value
        : null,
      e.target.region
        ? e.target.region.value === "choose"
          ? null
          : e.target.region.value
        : null,
      e.target.category
        ? e.target.category.value === "choose"
          ? null
          : e.target.category.value
        : null,
    ];

    // Filter Lists
    setEntitiesList(filterDancers(...filtersValue));

    // Reset values
    e.target.reset();
  }

  return (
    <div className="container search-form">
      <form className="form" id="search" onSubmit={handleSearch}>
        <input
          className="input search-input"
          placeholder={`${
            catalogs === "dancers" ? "Ім'я або прізвище танцюриста" : ""
          }${catalogs === "clubs" ? "Назва клубу" : ""}${
            catalogs === "coaches" ? "Ім'я або прізвище тренера" : ""
          }${catalogs === "judges" ? "Ім'я або прізвище судді" : ""}`}
          name="name"
        />
        {(catalogs === "dancers" || catalogs === "coaches") && (
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
        )}
        {catalogs === "dancers" && (
          <select
            name="class"
            className="search-select class-select"
            defaultValue="choose"
          >
            <option className="class-option" value="choose" disabled>
              Клас
            </option>
            {dancerClasses.map((dancerClass) => (
              <option
                className="class-option"
                value={dancerClass.id}
                key={dancerClass.id}
              >
                {dancerClass.Class_Name.trim()}
              </option>
            ))}
          </select>
        )}
        {catalogs === "dancers" && (
          <select
            name="status"
            className="search-select status-select"
            defaultValue="choose"
          >
            <option className="status-option" value="choose" disabled>
              Статус
            </option>
            {statuses
              .filter((status) => status.Name !== "Не активний")
              .map((status) => (
                <option
                  className="club-option"
                  value={status.id}
                  key={status.id}
                >
                  {status.Name.trim()}
                </option>
              ))}
          </select>
        )}
        {catalogs === "clubs" && (
          <select
            name="region"
            className="search-select region-select"
            defaultValue="choose"
          >
            <option className="region-option" value="choose" disabled>
              Регіон
            </option>
            {regions.map((region) => (
              <option
                className="region-option"
                value={region.id}
                key={region.id}
              >
                {region.Region_Name.trim()}
              </option>
            ))}
          </select>
        )}
        {catalogs === "judges" && (
          <select
            name="category"
            className="search-select category-select"
            defaultValue="choose"
          >
            <option className="category-option" value="choose" disabled>
              Категорія
            </option>
            {judgeClasses.map((category) => (
              <option
                className="category-option"
                value={category.id}
                key={category.id}
              >
                {category.Category.trim()}
              </option>
            ))}
          </select>
        )}
        <Button
          className="btn-primary search-btn"
          buttonText={<Search />}
          type="submit"
        />
      </form>
      {/* {!loading && entitiesList.length && (
        <Button
          className="reset-filters-btn"
          buttonText="Скинути фільтри"
          onClick={() => {
            setEntitiesList(entitiesList);
          }}
        />
      )} */}
    </div>
  );
}
