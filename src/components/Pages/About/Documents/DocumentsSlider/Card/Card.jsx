// import Tilt from "react-parallax-tilt";
import "./Card.css";

export default function Card({ card }) {
  return (
    <div className="card-floating">
      <div className="tilt">
        <div className="document-card">
          <img
            src={`https://sgostu-backend.download${card.preview.data.attributes.url}`}
            className="document-card-photo"
          />
        </div>
      </div>
    </div>
  );
}
