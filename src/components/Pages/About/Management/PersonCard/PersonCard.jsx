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
            {language === "en"
              ? person.name_en.trim() + " " + person.surname_en.trim()
              : person.name.trim() + " " + person.surname.trim()}
          </h2>
          <span className="management-role">
            {managementType === "regions" &&
              person.regions &&
              (language === "en" ? person.region_en : person.region)}
            {managementType === "council" &&
              person.council &&
              (language === "en"
                ? person.council_role_en
                : person.council_role)}
          </span>
          <button
            className="more-btn"
            onClick={() => {
              setActivePerson(personId);
            }}
          >
            {language === "en" ? "More" : "Детальніше"}
          </button>
        </div>
      </div>
    </div>
  );
}
