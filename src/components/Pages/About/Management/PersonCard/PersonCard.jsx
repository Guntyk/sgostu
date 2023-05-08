import "./PersonCard.css";

export default function PersonCard({
  personId,
  person,
  managementType,
  activePerson,
  setActivePerson,
}) {
  const language = window.localStorage.getItem("language");
  return (
    <div
      className={`management-card-wrapper ${
        activePerson === personId ? "active" : ""
      }`}
    >
      <div
        className={`management-card ${
          activePerson === personId ? "active" : ""
        }`}
      >
        <img
          src={`https://sgostu-backend.download${person.photo.data.attributes.url}`}
          alt="Person photo"
          className="management-photo"
        />
        <div className="management-info">
          <h2 className="management-name">
            {language === "ua"
              ? person.name.trim() + " " + person.surname.trim()
              : person.name_en.trim() + " " + person.surname_en.trim()}
          </h2>
          <span className="management-role">
            {managementType === "regions" &&
              person.regions &&
              (language === "ua" ? person.region : person.region_en)}
            {managementType === "council" &&
              person.council &&
              (language === "ua"
                ? person.council_role
                : person.council_role_en)}
          </span>
          <button
            className="more-btn"
            onClick={() => {
              setActivePerson(personId);
            }}
          >
            {language === "ua" ? "Детальніше" : "More"}
          </button>
        </div>
      </div>
    </div>
  );
}
