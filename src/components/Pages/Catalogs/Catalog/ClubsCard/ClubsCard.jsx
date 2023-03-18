import "./ClubsCard.css";
import { EffectFade } from "swiper";

export default function ClubsCard() {
  return (
    <div className="club-card">
      <img
        className="club-card-img"
        src="https://via.placeholder.com/500.png/09f/fff"
        alt=""
      />
      <p className="club-card-city">Київ</p>
      <h4 className="club-card-title">Diamant Elite</h4>
      <span className="club-card-owner">Larysa Mashyna</span>
      <div className="club-card-stats">
        <span className="coaches-quantity">11</span>
        <span className="dancers-quantity">66</span>
      </div>
      <a href="#" className="club-cards-details-link">
        Детальніше
      </a>
    </div>
  );
}
