import EventCard from "../../Calendar/MonthSection/EventCard/EventCard";
import Button from "../../../../common/Button/Button";
import { EffectCoverflow, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useHistory } from "react-router-dom";
import { ScrollTrigger } from "gsap/all";
import "swiper/css/effect-coverflow";
import { useEffect } from "react";
import "swiper/css/pagination";
import "./NearestEvents.css";
import { gsap } from "gsap";
import "swiper/css";

gsap.registerPlugin(ScrollTrigger);

export default function NearestEvents({ events }) {
  const language = window.localStorage.getItem("language");
  const history = useHistory();
  const nearestEvents = events
    .map((event) => {
      if (
        event.attributes.organizations.data
          .map((org) => org.attributes.name === "СГОСТУ")
          .includes(true)
      ) {
        return event;
      }
    })
    .filter((event) => event !== undefined)
    .slice(0, 3);

  useEffect(() => {
    gsap.from(".event-card", {
      y: 50,
      opacity: 0,
      stagger: 0.5,
      duration: 1,
      scrollTrigger: {
        trigger: ".event-card",
        toggleActions: "restart pause resume pause",
      },
    });
  }, []);

  return (
    <>
      <article className="nearest-events">
        <div className="nearest-events-title">
          <p>
            {language === "en"
              ? "The nearest events of SGOSTU"
              : "Найближчі заходи СГОСТУ"}
          </p>
          <p>
            {language === "en"
              ? "The nearest events of SGOSTU"
              : "Найближчі заходи СГОСТУ"}
          </p>
          <p>
            {language === "en"
              ? "The nearest events of SGOSTU"
              : "Найближчі заходи СГОСТУ"}
          </p>
          <p>
            {language === "en"
              ? "The nearest events of SGOSTU"
              : "Найближчі заходи СГОСТУ"}
          </p>
          <p>
            {language === "en"
              ? "The nearest events of SGOSTU"
              : "Найближчі заходи СГОСТУ"}
          </p>
          <p>
            {language === "en"
              ? "The nearest events of SGOSTU"
              : "Найближчі заходи СГОСТУ"}
          </p>
        </div>
        <div className="nearest-events-wrapper">
          {nearestEvents.length !== 0 ? (
            nearestEvents.map((event) => (
              <EventCard
                className="nearest-event-card"
                event={event.attributes}
                eventId={event.id}
                key={event.id}
              />
            ))
          ) : (
            <span className="event-void">
              {" "}
              {language === "en"
                ? "Unfortunately, there are no events"
                : "На жаль, заходів немає"}
            </span>
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
            nearestEvents.map((event) => (
              <SwiperSlide key={event.id}>
                <EventCard
                  className="nearest-event-card"
                  event={event.attributes}
                  eventId={event.id}
                  key={event.id}
                />
              </SwiperSlide>
            ))
          ) : (
            <span className="event-void">
              {" "}
              {language === "en"
                ? "Unfortunately, there are no events"
                : "На жаль, заходів немає"}
            </span>
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
