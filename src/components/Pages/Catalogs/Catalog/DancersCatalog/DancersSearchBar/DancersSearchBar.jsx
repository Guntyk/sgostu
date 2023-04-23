import Search from "../../../../../../materials/icons/Search";
import Button from "../../../../../../common/Button/Button";
import "./DancersSearchBar.css";

export default function DancersSearchBar({
  setDancersList,
  dancerClasses,
  dancersList,
  statuses,
  dancers,
  loading,
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
        e.target.name.value?.toLowerCase().trim() || null,
        e.target.club?.value === "choose" ? null : e.target.club.value,
        e.target.class?.value === "choose" ? null : e.target.class.value,
        e.target.status?.value === "choose" ? null : e.target.status.value
      )
    );
    // Reset values
    e.target.name.value = "";
    e.target.club.value = "choose";
    e.target.class.value = "choose";
    e.target.status.value = "choose";
  }

  return (
    <div className="container search-form">
      <form className="form" onSubmit={handleSearch}>
        <input
          className="input search-input"
          placeholder="Ім'я або прізвище танцюриста"
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
