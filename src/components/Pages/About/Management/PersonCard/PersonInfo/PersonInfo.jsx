import "./PersonInfo.css";

export default function PersonInfo({
  person,
  personId,
  activePerson,
  setActivePerson,
  managementType,
}) {
  return (
    <div
      className={`person-details-wrapper ${
        activePerson === personId ? "active" : ""
      }`}
    >
      <div
        className={`person-detail-card ${
          !person.description ? "non-descripted" : ""
        }`}
      >
        <div
          className="management-cross"
          onClick={() => {
            setActivePerson({});
          }}
        ></div>
        <div className="person-details-content-wrapper">
          <div className="person-detail-info">
            <h2 className="person-detail-name">
              {person.surname + " " + person.name}
            </h2>
            <span className="person-detail-role">
              <User />{" "}
              {managementType === "council"
                ? person.council_role
                : person.region_role}
            </span>
            <span className="person-detail-town">
              <City /> {person.town}
            </span>
            <p className="person-detail-description">
              {String(person.description)}
            </p>
            <div className="person-contacts">
              <a
                href={`tel:${person.phone}`}
                className="person-contact person-detail-phone"
              >
                <Phone /> {person.phone}
              </a>
              <a
                href={`mailTo:${person.email}`}
                className="person-contact person-detail-email"
              >
                <Email /> {person.email}
              </a>
            </div>
          </div>
          <img
            src={`https://sgostu-backend.download${person.photo.data.attributes.url}`}
            alt="1"
            className="person-detail-photo"
          />
        </div>
      </div>
    </div>
  );
}

function City() {
  return (
    <svg
      style={{ width: "20px", height: "20px" }}
      className="town-icon icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 512"
    >
      <path d="M104 0C90.7 0 80 10.7 80 24V64H72C32.2 64 0 96.2 0 136V440c0 39.8 32.2 72 72 72H240c-10-13.4-16-30-16-48H72c-13.3 0-24-10.7-24-24V136c0-13.3 10.7-24 24-24h8 48 48 48V64 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H128V24c0-13.3-10.7-24-24-24zM464 160c0 26.5 21.5 48 48 48h64c8.8 0 16 7.2 16 16V448c0 8.8-7.2 16-16 16H448 320c-8.8 0-16-7.2-16-16V224 64c0-8.8 7.2-16 16-16H448c8.8 0 16 7.2 16 16v96zm48-48V64c0-35.3-28.7-64-64-64H320c-35.3 0-64 28.7-64 64V224 448c0 35.3 28.7 64 64 64H448 576c35.3 0 64-28.7 64-64V224c0-35.3-28.7-64-64-64H560 512V112zM352 336c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V304c0-8.8-7.2-16-16-16H368c-8.8 0-16 7.2-16 16v32zM368 96c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H368zM352 240c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V208c0-8.8-7.2-16-16-16H368c-8.8 0-16 7.2-16 16v32zM496 416h32c8.8 0 16-7.2 16-16V368c0-8.8-7.2-16-16-16H496c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16zM480 304c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H496c-8.8 0-16 7.2-16 16v32zM112 320h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H112c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16zM96 400c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V368c0-8.8-7.2-16-16-16H112c-8.8 0-16 7.2-16 16v32zm16-176h32c8.8 0 16-7.2 16-16V176c0-8.8-7.2-16-16-16H112c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16z" />
    </svg>
  );
}
function User() {
  return (
    <svg
      style={{ width: "20px", height: "20px" }}
      className="user-icon icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
    >
      <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" />
    </svg>
  );
}
function Phone() {
  return (
    <svg
      style={{ width: "20px", height: "20px" }}
      className="town-icon icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path d="M375.8 275.2c-16.4-7-35.4-2.4-46.7 11.4l-33.2 40.6c-46-26.7-84.4-65.1-111.1-111.1L225.3 183c13.8-11.3 18.5-30.3 11.4-46.7l-48-112C181.2 6.7 162.3-3.1 143.6 .9l-112 24C13.2 28.8 0 45.1 0 64v0C0 295.2 175.2 485.6 400.1 509.5c9.8 1 19.6 1.8 29.6 2.2c0 0 0 0 0 0c0 0 .1 0 .1 0c6.1 .2 12.1 .4 18.2 .4l0 0c18.9 0 35.2-13.2 39.1-31.6l24-112c4-18.7-5.8-37.6-23.4-45.1l-112-48zM441.5 464C225.8 460.5 51.5 286.2 48.1 70.5l99.2-21.3 43 100.4L154.4 179c-18.2 14.9-22.9 40.8-11.1 61.2c30.9 53.3 75.3 97.7 128.6 128.6c20.4 11.8 46.3 7.1 61.2-11.1l29.4-35.9 100.4 43L441.5 464zM48 64v0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0s0 0 0 0" />
    </svg>
  );
}
function Email() {
  return (
    <svg
      style={{ width: "20px", height: "20px" }}
      className="town-icon icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z" />
    </svg>
  );
}
