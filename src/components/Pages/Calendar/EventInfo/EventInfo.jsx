import { dateToLocalFormat } from "../../../../helpers/dateToLocalFormat";
import { eventsSelector } from "../../../../redux/events/selectors";
import eventImg from "../../../../materials/img/event.jpg";
import { getEvents } from "../../../../redux/events/thunk";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../../common/Button/Button";
import { Link, useParams } from "react-router-dom";
import Loader from "../../../Loader/Loader";
import { useEffect } from "react";
import { useState } from "react";
import "./EventInfo.css";

export default function EventInfo() {
  const [info, setInfo] = useState("Про змагання");
  const events = useSelector(eventsSelector);
  const [event, setEvent] = useState(null);
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

  const list = document.querySelectorAll(".event-details-list");
  function activeLink() {
    list.forEach((item) => item.classList.remove("active"));
    this.classList.add("active");
    setInfo(this.innerText);
  }
  list.forEach((item) => item.addEventListener("click", activeLink));

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
                <img src={eventImg} alt="Банер турніру" />
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
              <Button
                className="event-info-btn black"
                buttonText="Реєстрація учасників"
              />
              <Button
                className="event-info-btn black"
                buttonText="Реєстрація суддів"
              />
              <Button className="event-info-btn" buttonText="Інформація" />
            </div>
            <div className="event-detail-info-row">
              <ul className="event-detail-buttons">
                <li className="event-details-list">Про змагання</li>
                <li className="event-details-list">Відділення</li>
                <li className="event-details-list">Адреса</li>
                <div className="indicator"></div>
              </ul>
            </div>
            <div className="event-detail-information">
              <p>
                {info === "Про змагання" && event.about}
                {info === "Відділення" && event.table}
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
