import { searchDancersAction } from "../../redux/dancers/actionCreators";
import { useDispatch } from "react-redux";
import Button from "../Button/Button";
import Input from "../Input/Input";
import "./SearchBar.css";
import { getAllDancersFetch } from "../../api/requests";
import { useEffect, useState } from "react";

export default function SearchBar({
  clubs,
  dancerClasses,
  statuses,
  setDancersList,
}) {
  const [fullDancersList, setFullDancersList] = useState([]);
  useEffect(() => {
    if (statuses.length !== 0) {
      getAllDancersFetch(statuses).then((response) => {
        setDancersList(response);
        setFullDancersList(response);
      });
    }
  }, [statuses]);

  const filterDancers = (nameValue, clubValue, classValue, statusValue) => {
    if (!nameValue && !clubValue && !classValue && !statusValue) {
      return fullDancersList;
    }

    let list = [...fullDancersList];

    if (nameValue) {
      list = list.filter(
        (dancer) =>
          dancer.D_Surname.toLowerCase().includes(nameValue) ||
          dancer.D_Name.toLowerCase().includes(nameValue)
      );
    }
    if (clubValue) {
      list = list.filter((dancer) =>
        dancer["Club-"].includes(Number(clubValue))
      );
    }
    if (classValue) {
      list = list.filter((dancer) =>
        dancer["Dancer Class"].includes(Number(classValue))
      );
    }
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
    e.target.search.value = "";
    e.target.club.value = "choose";
    e.target.class.value = "choose";
    e.target.status.value = "choose";
  }

  return (
    <div className="container">
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
          buttonText="Пошук"
          type="submit"
        />
      </form>
    </div>
  );
}
