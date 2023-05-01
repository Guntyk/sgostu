import Tilt from "react-parallax-tilt";
import "./Card.css";

export default function Card({ card }) {
  return (
    <div className="card-floating">
      <div className="tilt">
        <div className="card">
          <img
            src="https://picsum.photos/1080/1920"
            className="card-photo"
          />
        </div>
      </div>   
    </div>
  );
}
