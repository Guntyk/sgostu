import { managementSelector } from "../../../../redux/management/selectors";
import { getManagement } from "../../../../redux/management/thunk";
import PersonInfo from "./PersonCard/PersonInfo/PersonInfo";
import { useDispatch, useSelector } from "react-redux";
import PersonCard from "./PersonCard/PersonCard";
import { useEffect, useState } from "react";
import Loader from "../../../Loader/Loader";
import "./Management.css";

export default function Management() {
  const language = window.localStorage.getItem("language");
  const [managementType, setManagementType] = useState("council");
  const [activePerson, setActivePerson] = useState({});
  const management = useSelector(managementSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (management.length === 0) {
      dispatch(getManagement());
    }
  }, []);

  function handleChangeType(e) {
    if (
      e.target.innerText === "Рада СГОСТУ" ||
      e.target.innerText === "The Council of SGOSTU"
    ) {
      setManagementType("council");
    } else {
      setManagementType("regions");
    }
  }

  return (
    <div className="management">
      <h1 className="management-title">
        {language === "en" ? "Management" : "Керівництво"}
      </h1>
      <div className="managements-selection">
        <button
          className={`management-type ${
            managementType === "council" ? "active" : ""
          }`}
          onClick={handleChangeType}
        >
          {language === "en" ? "The Council of SGOSTU" : "Рада СГОСТУ"}
        </button>
        <button
          className={`management-type ${
            managementType === "regions" ? "active" : ""
          }`}
          onClick={handleChangeType}
        >
          {language === "en"
            ? "Regional separate subdivisions"
            : "Обласні відокремлені підрозділи"}
        </button>
      </div>
      <div className="management-cards">
        {management.length !== 0 ? (
          management
            .filter((person) =>
              managementType === "council"
                ? person.attributes.council
                : person.attributes.regions
            )
            .map((person) => (
              <PersonCard
                key={person.id}
                personId={person.id}
                person={person.attributes}
                activePerson={activePerson}
                managementType={managementType}
                setActivePerson={setActivePerson}
              />
            ))
        ) : (
          <Loader />
        )}
      </div>
      <div className="management-detail-cards">
        {management.length !== 0
          ? management
              .filter((person) =>
                managementType === "council"
                  ? person.attributes.council
                  : person.attributes.regions
              )
              .map((person) => (
                <PersonInfo
                  key={person.id}
                  personId={person.id}
                  person={person.attributes}
                  activePerson={activePerson}
                  managementType={managementType}
                  setActivePerson={setActivePerson}
                />
              ))
          : "Loading..."}
      </div>
    </div>
  );
}
