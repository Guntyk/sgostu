import { useHistory, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination } from "swiper";
import { useState } from "react";
import { cards } from "../data";
import Card from "./Card/Card";
import "./DocumentsSlider.css";
import "swiper/css";

export default function DocumentsSlider() {
  const [activeSlideIdx, setActiveSlideIdx] = useState({});
  const { documentsType } = useParams();
  const { goBack } = useHistory();
  const cardsType = cards.filter(
    (card) => card.attributes.type.slice(-1) === documentsType
  );

  return (
    <div className="slider-box">
      <button className="back-btn" onClick={goBack}>
        <BackArrow />
      </button>
      {cards
        .filter((card) => card.attributes.type.slice(-1) === documentsType)
        .map((card) => (
          <div
            key={card.id}
            className={`overlay ${
              cardsType.indexOf(card) === activeSlideIdx ? "active" : ""
            }`}
          >
            <div className="info-wrapper">
              <h1 className="card-name">{card.attributes.name}</h1>
              <p className="card-descr">{card.attributes.description}</p>
              <div className="card-btn-wrapper">
                <button className="card-btn">Open</button>
              </div>
            </div>
          </div>
        ))}
      <Swiper
        className="slider"
        modules={[Mousewheel]}
        speed={800}
        draggable={false}
        centeredSlides={true}
        slidesPerView={2}
        mousewheel={true}
        onSwiper={(e) => {
          setActiveSlideIdx(e.activeIndex);
        }}
        onSlideChange={(e) => {
          setActiveSlideIdx(e.activeIndex);
        }}
        breakpoints={{
          1600: {
            slidesPerView: 4,
          },
          1150: {
            slidesPerView: 3,
            draggable: false,
          },
          840: {
            slidesPerView: 2.5,
            draggable: false,
          },
          550: {
            slidesPerView: 2,
            draggable: false,
          },
        }}
      >
        {cards
          .filter((card) => card.attributes.type.slice(-1) === documentsType)
          .map((card) => (
            <SwiperSlide key={card.id}>
              <Card card={card} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}

function BackArrow() {
  return (
    <svg
      cursor="pointer"
      width="30px"
      height="30px"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path d="M7 239c-9.4 9.4-9.4 24.6 0 33.9L143 409c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-95-95L488 280c13.3 0 24-10.7 24-24s-10.7-24-24-24L81.9 232l95-95c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L7 239z" />
    </svg>
  );
}
