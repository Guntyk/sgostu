import "./DancerInfo.css";

export default function DancerInfo() {
  return (
    <section className="dancer-info">
      <div className="dancer">
        <img
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          alt=""
          className="dancer-avatar"
        />
        <div className="dancer-inner">
          <h2 className="dancer-name">Вікторія Чубук</h2>
          <dl className="dancer-details">
            <div className="dancer-details-wrapper">
              <dt className="dancer-birth">Дата народження: </dt>
              <dd>04.12.2009</dd>
            </div>
            <div className="dancer-details-wrapper">
              <dt className="dancer-class">Клас: </dt>
              <dd>E</dd>
            </div>
            <div className="dancer-details-wrapper">
              <dt className="dancer-club">Клуб:</dt>
              <dd>Diamant Elite</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
