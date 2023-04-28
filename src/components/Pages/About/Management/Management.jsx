import PersonInfo from "./PersonCard/PersonInfo/PersonInfo";
import PersonCard from "./PersonCard/PersonCard";
import { useEffect, useState } from "react";
import "./Management.css";

export default function Management() {
  const [managementType, setManagementType] = useState("council");
  const [activePerson, setActivePerson] = useState({});
  const [management, setManagement] = useState({});

  useEffect(() => {
    fetch(
      "https://sgostu-backend.download/api/managements?sort=createdAt&populate=*&pagination[pageSize]=50"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setManagement(data);
      });
  }, []);

  function handleChangeType(e) {
    if (e.target.innerText === "Рада СГОСТУ") {
      setManagementType("council");
    } else {
      setManagementType("regions");
    }
  }

  return (
    <div className="management">
      <h1 className="management-title">Керівництво</h1>
      <div className="managements-selection">
        <button
          className={`management-type ${
            managementType === "council" ? "active" : ""
          }`}
          onClick={handleChangeType}
        >
          Рада СГОСТУ
        </button>
        <button
          className={`management-type ${
            managementType === "regions" ? "active" : ""
          }`}
          onClick={handleChangeType}
        >
          Обласні відокремлені підрозділи
        </button>
      </div>
      <div className="management-cards">
        {management.data
          ? management.data
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
          : "Loading..."}
      </div>
      <div className="management-detail-cards">
        {management.data
          ? management.data
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
