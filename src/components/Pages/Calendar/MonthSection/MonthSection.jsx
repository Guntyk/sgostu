import { Swiper, SwiperSlide } from "swiper/react";
import EventCard from "./EventCard/EventCard";
import "./MonthSection.css";

export default function MonthSection({ month, events }) {
  events.sort((a, b) => {
    const dateA = new Date(a.attributes.start),
      dateB = new Date(b.attributes.start);
    return dateA - dateB;
  });

  const foo = events.slice(3, 5); //! month sorting

  return (
    <section className="calendar-month">
      <span className="calendar-month-title">{month}:</span>
      <Swiper className="events-slider" slidesPerView={3} grabCursor={true}>
        {events.length !== 0 ? (
          events.map((event) => (
            <SwiperSlide key={event.id}>
              <EventCard event={event.attributes} />
            </SwiperSlide>
          ))
        ) : (
          <span className="event-void">На жаль, заходів немає</span>
        )}
      </Swiper>
    </section>
  );
}
