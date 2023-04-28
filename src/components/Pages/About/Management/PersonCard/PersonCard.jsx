import "./PersonCard.css";

export default function PersonCard({
  personId,
  person,
  managementType,
  activePerson,
  setActivePerson,
}) {
  return (
    <div
      className={`management-card-wrapper ${
        activePerson === personId ? "active" : ""
      }`}
    >
      <div
        className={`management-card ${activePerson === personId ? "active" : ""}`}
      >
        <img
          src={`https://sgostu-backend.download${person.photo.data.attributes.url}`}
          alt="Person photo"
          className="management-photo"
        />
        <div className="management-info">
          <h2 className="management-name">
            {person.name.trim() + " " + person.surname.trim()}
          </h2>
          <span className="management-role">
            {managementType === "regions" && person.regions && person.region}
            {managementType === "council" &&
              person.council &&
              person.council_role}
          </span>
          <button
            className="more-btn"
            onClick={() => {
              setActivePerson(personId);
            }}
          >
            Детальніше
          </button>
        </div>
      </div>
    </div>
  );
}
