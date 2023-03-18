import { dateToLocalFormat } from "../../../../helpers/dateToLocalFormat";
import { eventsSelector } from "../../../../redux/events/selectors";
import { getEvents } from "../../../../redux/events/thunk";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../../common/Button/Button";
import { Link, useParams } from "react-router-dom";
import Loader from "../../../Loader/Loader";
import { useEffect } from "react";
import { useState } from "react";
import "./EventInfo.css";

export default function EventInfo() {
  const events = useSelector(eventsSelector);
  const [event, setEvent] = useState(null);
  const [info, setInfo] = useState("Спонсори та партнери");
  const { eventId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (events.length === 0) {
      dispatch(getEvents());
    }
  }, []);

  useEffect(() => {
    [...events].map((eventObj) => {
      if (Number(eventObj.id) === Number(eventId)) {
        setEvent(eventObj);
      }
    });
  }, [events]);

  useEffect(() => {
    if (event) {
      const list = document.querySelectorAll(".event-details-list");
      function activeLink() {
        list.forEach((item) => item.classList.remove("active"));
        this.classList.add("active");
        setInfo(this.innerText);
      }
      list.forEach((item) => item.addEventListener("click", activeLink));
    }
  }, [event]);

  return (
    <>
      {event ? (
        <article className="event-info">
          <div className="container event-details-container">
            <Link className="back-link" to="/calendar">
              ˂ Назад
            </Link>
            <div className="event-detail-info-row">
              <div className="img-wrapper">
                {event.banner?.url ? (
                  <img src={event.banner?.url} alt="Банер турніру" />
                ) : (
                  <span>Не заповнено</span>
                )}
              </div>
              <ul className="event-details">
                <li className="event-detail-info-title">{event.title}</li>
                <li>
                  <span className="event-detail-stroke-name">
                    Організація:{" "}
                  </span>
                  {event.organization}
                </li>
                <li>
                  <span className="event-detail-stroke-name">
                    Організатор:{" "}
                  </span>
                  {event.organizator}
                </li>
                <li>
                  <span className="event-detail-stroke-name">Місто: </span>
                  {event.town}
                </li>
                <li>
                  <span className="event-detail-stroke-name">Дата: </span>
                  {dateToLocalFormat(event.start)}
                </li>
              </ul>
            </div>
            <div className="event-detail-info-row">
              <Button className="event-info-btn" buttonText="Інформація" />

              <Button className="event-info-btn" buttonText="Судді" />
              <Button
                className="event-info-btn black"
                buttonText="Реєстрація учасників"
              />
            </div>
            <div className="event-detail-info-row">
              <ul className="event-detail-buttons">
                <li className="event-details-list active">
                  Спонсори та партнери
                </li>
                <li className="event-details-list">Готелі</li>
                <li className="event-details-list">Адреса</li>
                <div className="indicator"></div>
              </ul>
            </div>
            <div className="event-detail-information">
              <p>
                {info === "Спонсори та партнери" && event.sponsors}
                {info === "Готелі" && event.hotels}
                {info === "Адреса" && (
                  <iframe
                    src={event.address}
                    width="100%"
                    height="490px"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                )}
              </p>
            </div>
          </div>
        </article>
      ) : (
        <Loader />
      )}
    </>
  );
}
