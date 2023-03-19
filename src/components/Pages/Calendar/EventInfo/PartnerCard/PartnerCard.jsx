import "./PartnerCard.css";

export default function PartnerCard({ partner }) {
  return (
    <a
      href={partner.link}
      target="_blank"
      rel="noreferrer"
      className={`partner-card ${partner.link && "linked"}`}
    >
      <img
        className="partner-img"
        src={
          "https://backend-tbpix.ondigitalocean.app" +
          partner.logo.data.attributes.url
        }
        alt="Логотип спонсора/партнера заходу"
      />
      {partner.name}
    </a>
  );
}
