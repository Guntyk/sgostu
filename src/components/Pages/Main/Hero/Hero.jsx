import "./Hero.css";
import "../../../media.css";
export default function Hero() {
  return (
    <div className="hero">
      <div className="container">
        <div className="hero__wrapper">
          <h1 className="title">
            <div>
              <span className="title-stroke">
                Спілка громадських організацій
              </span>
            </div>
            <div>
              <span className="title-stroke"> спортивного танцю України</span>
            </div>
          </h1>
        </div>
      </div>
      <span className="blur"></span>
    </div>
  );
}
