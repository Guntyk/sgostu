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

  return (
    <section className="calendar-month">
      <span className="calendar-month-title">{month}:</span>
      <div className="events-slider-wrapper">
        <div className="arrow arrow-left">
          <span className="arrow-line"></span>
          <span className="arrow-line"></span>
        </div>
        <Swiper
          className="events-slider"
          slidesPerView={3}
          grabCursor={true}
          navigation={{
            nextEl: ".arrow-right",
            prevEl: ".arrow-left",
            disabledClass: "arrow-disabled",
          }}
          modules={[Navigation]}
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
            <span className="event-void">На жаль, заходів немає</span>
          )}
        </Swiper>
        <div className="arrow arrow-right">
          <span className="arrow-line"></span>
          <span className="arrow-line"></span>
        </div>
      </div>
    </section>
  );
}
