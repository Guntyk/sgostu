import NearestEventSlide from "./NearestEventSlide/NearestEventSlide";
import NearestEventCard from "./NearestEventCard/NearestEventCard";
import { eventsSelector } from "../../../../redux/events/selectors";
import { fetchEvents } from "../../../../redux/events/thunk";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../../common/Button/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import { useHistory } from "react-router-dom";
import { EffectCoverflow } from "swiper";
import "swiper/css/effect-coverflow";
import { useEffect } from "react";
import "./NearestEvents.css";
import "swiper/css";

export default function NearestEvents() {
  const events = useSelector(eventsSelector);
  const dispatch = useDispatch();
  const history = useHistory();

  events.sort((a, b) => {
    const dateA = new Date(a.attributes.start),
      dateB = new Date(b.attributes.start);
    return dateA - dateB; // sort by ascending date
  });

  const nearestEvents = events
    .map((event) => {
      if (event.attributes.organization === "СГОСТУ") return event;
    })
    .filter((event) => {
      return event !== undefined;
    });

  useEffect(() => {
    dispatch(fetchEvents());
  }, []);

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
          coverflowEffect={{ rotate: 0, slideShadows: false, scale: 0.8 }}
          modules={[EffectCoverflow]}
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
