import NearestEventSlide from "./NearestEventSlide/NearestEventSlide";
import NearestEventCard from "./NearestEventCard/NearestEventCard";
import Button from "../../../../common/Button/Button";
import { EffectCoverflow, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useHistory } from "react-router-dom";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./NearestEvents.css";
import "swiper/css";

export default function NearestEvents({ events }) {
  const history = useHistory();

  const nearestEvents = events
    .sort((a, b) => {
      const dateA = new Date(a.start),
        dateB = new Date(b.start);
      return dateA - dateB;
    })
    .map((event) => {
      if (event.organization === "СГОСТУ") return event;
    })
    .filter((event) => {
      return event !== undefined;
    });

  return (
    <>
      <article className="nearest-events">
        <div className="nearest-events-title">
          <p className="marquee">
            Найближчі заходи Найближчі заходи Найближчі заходи Найближчі заходи
            Найближчі заходи
          </p>
        </div>
        <div className="nearest-events-wrapper">
          {nearestEvents.length !== 0 ? (
            nearestEvents
              .slice(0, 3)
              .map((event) => <NearestEventCard event={event} key={event.id} />)
          ) : (
            <span className="event-void">На жаль, заходів немає</span>
          )}
        </div>
        <Swiper
          className="slider"
          spaceBetween={-80}
          initialSlide={1}
          grabCursor={true}
          slideToClickedSlide={true}
          effect={"coverflow"}
          pagination={true}
          coverflowEffect={{ rotate: 0, slideShadows: false, scale: 0.8 }}
          modules={[EffectCoverflow, Pagination]}
        >
          {nearestEvents.length !== 0 ? (
            nearestEvents.slice(0, 3).map((event) => (
              <SwiperSlide key={event.id}>
                <NearestEventSlide event={event} />
              </SwiperSlide>
            ))
          ) : (
            <span className="event-void">На жаль, заходів немає</span>
          )}
        </Swiper>
        {nearestEvents.length !== 0 && (
          <Button
            buttonText="Більше"
            onClick={() => {
              history.push("/calendar");
            }}
          />
        )}
      </article>
    </>
  );
}
