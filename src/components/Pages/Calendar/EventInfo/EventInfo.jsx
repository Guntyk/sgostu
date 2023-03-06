import { dateToLocalFormat } from "../../../../helpers/dateToLocalFormat";
import eventImg from "../../../../materials/img/event.jpg";
import Button from "../../../../common/Button/Button";
import { Link, useParams } from "react-router-dom";
import { Context } from "../../../..";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./EventInfo.css";

export default function EventInfo() {
  const [loading, setLoading] = useState(true);
  const { events } = useContext(Context);
  const [info, setInfo] = useState("Спонсори та партнери");
  const [event, setEvent] = useState({});
  const { eventId } = useParams();

  useEffect(() => {
    [...events].map((eventObj) => {
      if (Number(eventObj.id) === Number(eventId)) {
        setEvent(eventObj);
      }
    });
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [event]);

  const list = document.querySelectorAll(".event-details-list");
  function activeLink() {
    list.forEach((item) => item.classList.remove("active"));
    this.classList.add("active");
    setInfo(this.innerText);
  }
  list.forEach((item) => item.addEventListener("click", activeLink));

  return (
    <>
      {!loading ? (
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
        <h1>Loading...</h1>
      )}
    </>
  );
}
