import { filterEntities } from "../../../../../helpers/filterEntities";
import Search from "../../../../../materials/icons/Search";
import Button from "../../../../../common/Button/Button";
import { useState } from "react";
import "./SearchBar.css";

export default function SearchBar({
  setEntitiesList,
  dancerClasses,
  entitiesList,
  judgeClasses,
  catalogs,
  statuses,
  coaches,
  dancers,
  regions,
  loading,
  judges,
  clubs,
}) {
  const [increase, setIncrease] = useState(false);

  const filteringArr =
    catalogs === "dancers"
      ? dancers
      : catalogs === "clubs"
      ? clubs
      : catalogs === "coaches"
      ? coaches
      : catalogs === "judges" && judges;

  function handleSearch(e) {
    e.preventDefault();
    window.scrollTo(0, 0);

    const inputValues = [
      e.target.club,
      e.target.class,
      e.target.status,
      e.target.region,
      e.target.category,
    ];

    const filtersValue = [
      catalogs,
      filteringArr,
      e.target.name.value?.toLowerCase().trim() || null,
      ...inputValues.map((inputValue) =>
        inputValue
          ? inputValue.value === "choose"
            ? null
            : inputValue.value
          : null
      ),
    ];

    // Main functions
    setEntitiesList(filterEntities(...filtersValue));

    // Reset values
    e.target.reset();
  }

  return (
    <div className={`container search-form ${increase ? "increase" : ""}`}>
      <form className="form" id="search" onSubmit={handleSearch}>
        <input
          className="search-input"
          placeholder={`${
            catalogs === "dancers" ? "Ім'я або прізвище танцюриста" : ""
          }${catalogs === "clubs" ? "Назва клубу" : ""}${
            catalogs === "coaches" ? "Ім'я або прізвище тренера" : ""
          }${catalogs === "judges" ? "Ім'я або прізвище судді" : ""}`}
          name="name"
        />
        <div className={`form-inner`}>
          <div className={`form-selectors-wrapper ${increase && "increase"}`}>
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
                    {club["Club Name"].split("(")[0].trim()}
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
                    {dancerClass["Class Name"].trim()}
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
                    {region["Region Name"].trim()}
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
          </div>
          <Button
            className="btn-primary search-btn"
            buttonText={<Search />}
            type="submit"
          />
        </div>
      </form>
      <div className="button-wrapper">
        {!loading && entitiesList.length < filteringArr.length && (
          <Button
            className="reset-filters-btn"
            buttonText="Скинути фільтри"
            onClick={() => {
              setEntitiesList(filteringArr);
            }}
          />
        )}
        <Button
          className={`reset-filters-btn collapse-btn ${increase && "increase"}`}
          buttonText={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="24"
                d="M112 184l144 144 144-144"
              />
            </svg>
          }
          onClick={() => {
            setIncrease(!increase);
          }}
        />
      </div>
    </div>
  );
}
