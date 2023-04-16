import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, FreeMode } from "swiper";
import EventCard from "./EventCard/EventCard";
import { useEffect } from "react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./MonthSection.css";

export default function MonthSection({ month, monthIdx, events }) {
  const language = window.localStorage.getItem("language");

  useEffect(() => {
    if (events.length !== 0) {
      const parent = document.getElementById(`swiper${monthIdx}`);
      if (parent.hasChildNodes()) {
        const children = parent.childNodes;
        if (children[0].childNodes.length < 1) {
          parent.innerHTML = `<span className="event-void">На жаль, заходів немає</span>`;
        }
      }
    }
  }, [events]);

  return (
    <section className="calendar-month">
      <div className="container">
        <span className="calendar-month-title">{month}:</span>
      </div>
      <div className="events-slider-wrapper">
        <div className={`arrow arrow-left arrow-left${monthIdx}`}>
          <span className="arrow-line"></span>
          <span className="arrow-line"></span>
        </div>
        <Swiper
          className={`events-slider events-slider${monthIdx}`}
          slidesPerView={3}
          grabCursor={true}
          navigation={{
            nextEl: `.arrow-right${monthIdx}`,
            prevEl: `.arrow-left${monthIdx}`,
            disabledClass: `arrow-disabled`,
          }}
          modules={[Navigation, Pagination, FreeMode]}
          id={`swiper${monthIdx}`}
          spaceBetween={10}
          pagination={{ clickable: true }}
          breakpoints={{
            // when window width is >= 320px
            0: {
              pagination: true,
            },
            50: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            360: {
              slidesPerView: 2.2,
              spaceBetween: 20,
            },
            // when window width is >= 480px
            550: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            // when window width is >= 640px
            840: {
              slidesPerView: 3,
              spaceBetween: 10,
              pagination: false,
            },
            1150: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
        >
          {events.length !== 0 ? (
            events.map(
              (event) =>
                new Date(event.attributes.start).getMonth() === monthIdx && (
                  <SwiperSlide key={event.id}>
                    <EventCard event={event.attributes} eventId={event.id} />
                  </SwiperSlide>
                )
            )
          ) : (
            <SwiperSlide>
              <h1 className="event-void">
                {language === "ua"
                  ? "На жаль, заходів немає"
                  : "Unfortunately, there are no events"}
              </h1>
            </SwiperSlide>
          )}
        </Swiper>
        <div className={`arrow arrow-right arrow-right${monthIdx}`}>
          <span className="arrow-line"></span>
          <span className="arrow-line"></span>
        </div>
      </div>
    </section>
  );
}
