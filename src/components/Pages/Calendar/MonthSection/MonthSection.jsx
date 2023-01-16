import { eventsSelector } from "../../../../redux/events/selectors";
import { fetchEvents } from "../../../../redux/events/thunk";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import EventCard from "./EventCard/EventCard";
import { Navigation } from "swiper";
import { useEffect } from "react";
import "swiper/css/navigation";
import "./MonthSection.css";

export default function MonthSection({ month, monthIdx }) {
  const events = useSelector(eventsSelector);
  const dispatch = useDispatch();
  events.sort((a, b) => {
    const dateA = new Date(a.attributes.start),
      dateB = new Date(b.attributes.start);
    return dateA - dateB;
  });

  useEffect(() => {
    dispatch(fetchEvents());
  }, []);

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
          modules={[Navigation]}
          id={`swiper${monthIdx}`}
        >
          {events.length !== 0 ? (
            events.map(
              (event) =>
                new Date(event.attributes.start).getMonth() === monthIdx && (
                  <SwiperSlide key={event.id}>
                    <EventCard event={event.attributes} />
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
