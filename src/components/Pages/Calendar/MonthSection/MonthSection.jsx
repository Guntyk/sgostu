import { Swiper, SwiperSlide } from "swiper/react";
import EventCard from "./EventCard/EventCard";
import { useEffect } from "react";
import { Navigation, Pagination } from "swiper";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./MonthSection.css";

export default function MonthSection({ month, monthIdx, events }) {
  events.sort((a, b) => {
    const dateA = new Date(a.start),
      dateB = new Date(b.start);
    return dateA - dateB;
  });

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
      <span className="calendar-month-title">{month}:</span>
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
          modules={[Navigation, Pagination]}
          id={`swiper${monthIdx}`}
          spaceBetween={10}
          pagination={{ clickable: true }}
          // Responsive breakpoints
          breakpoints={{
            // when window width is >= 320px
            0: {
              pagination: true,
            },
            50: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            400: {
              slidesPerView: 2,
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
                new Date(event.start).getMonth() === monthIdx && (
                  <SwiperSlide key={event.id}>
                    <EventCard event={event} />
                  </SwiperSlide>
                )
            )
          ) : (
            <SwiperSlide>
              <h1 className="event-void">На жаль, заходів немає</h1>
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
