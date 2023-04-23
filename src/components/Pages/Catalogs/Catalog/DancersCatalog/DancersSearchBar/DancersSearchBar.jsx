import Button from "../../../../../../common/Button/Button";
import Input from "../../../../../../common/Input/Input";
import "./DancersSearchBar.css";

export default function DancersSearchBar({
  setDancersList,
  dancerClasses,
  dancersList,
  setSearch,
  statuses,
  dancers,
  loading,
  search,
  clubs,
}) {
  const filterDancers = (nameValue, clubValue, classValue, statusValue) => {
    // Returning all dancers if fields are empty
    if (!nameValue && !clubValue && !classValue && !statusValue) {
      return dancers;
    }
    // Copying dancers for filtering
    let list = [...dancers];
    // Filtering by name
    if (nameValue) {
      list = list.filter(
        (dancer) =>
          dancer.D_Surname.toLowerCase().includes(nameValue) ||
          dancer.D_Name.toLowerCase().includes(nameValue)
      );
    }
    // Filtering by club
    if (clubValue) {
      list = list.filter((dancer) =>
        dancer["Club-"].includes(Number(clubValue))
      );
    }
    // Filtering by class
    if (classValue) {
      list = list.filter((dancer) =>
        dancer["Dancer Class"].includes(Number(classValue))
      );
    }
    // Filtering by status
    if (statusValue) {
      list = list.filter((dancer) =>
        dancer["Status"].includes(Number(statusValue))
      );
    }
    return list;
  };

  function handleSearch(e) {
    e.preventDefault();
    setDancersList(
      filterDancers(
        e.target.search.value?.toLowerCase().trim() || null,
        e.target.club?.value === "choose" ? null : e.target.club.value,
        e.target.class?.value === "choose" ? null : e.target.class.value,
        e.target.status?.value === "choose" ? null : e.target.status.value
      )
    );
    // Reset values
    e.target.search.value = "";
    e.target.club.value = "choose";
    e.target.class.value = "choose";
    e.target.status.value = "choose";
  }

  return (
    <div className="container search-form">
      <form className="form" onSubmit={handleSearch}>
        <Input
          inputClassName="search-input"
          placeholderText="Ім'я або прізвище танцюриста"
          name="search"
        />
        <select
          name="club"
          className="search-select club-select"
          defaultValue="choose"
        >
          <option className="club-option" value="choose" disabled>
            Оберіть клуб
          </option>
          {clubs.map((club) => (
            <option className="club-option" value={club.id} key={club.id}>
              {club.Club_Name.split("(")[0].trim()}
            </option>
          ))}
        </select>
        <select
          name="class"
          className="search-select class-select"
          defaultValue="choose"
        >
          <option className="class-option" value="choose" disabled>
            Оберіть клас
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
        <select
          name="status"
          className="search-select status-select"
          defaultValue="choose"
        >
          <option className="status-option" value="choose" disabled>
            Оберіть статус
          </option>
          {statuses
            .filter((status) => status.Name !== "Не активний")
            .map((status) => (
              <option className="club-option" value={status.id} key={status.id}>
                {status.Name.trim()}
              </option>
            ))}
        </select>
        <Button
          className="btn-primary search-btn"
          buttonText={<Search />}
          type="submit"
        />
      </form>
      {!loading && dancers.length > dancersList.length && (
        <Button
          className="reset-filters-btn"
          buttonText="Скинути фільтри"
          onClick={() => {
            setDancersList(dancers);
          }}
        />
      )}
    </div>
  );
}

function Search() {
  return (
    <svg
      className="search-icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path
        d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
        fill="none"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeWidth="32"
      />
      <path
        className="search-line"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="32"
        d="M338.29 338.29L448 448"
      />
    </svg>
  );
}
