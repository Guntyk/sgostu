import { dateToLocalFormat } from "../../../../helpers/dateToLocalFormat";
import couple from "../../../../materials/icons/calendar-card/couple.png";
import { eventsSelector } from "../../../../redux/events/selectors";
import BackButton from "../../../../common/BackButton/BackButton";
import { getEvents } from "../../../../redux/events/thunk";
import { useDispatch, useSelector } from "react-redux";
import PartnerCard from "./PartnerCard/PartnerCard";
import { useParams } from "react-router-dom";
import Loader from "../../../Loader/Loader";
import { useEffect } from "react";
import { useState } from "react";
import "./EventInfo.css";

export default function EventInfo() {
  const language = window.localStorage.getItem("language");
  const [info, setInfo] = useState("Спонсори та партнери");
  const url = "https://sgostu-backend.download";
  const events = useSelector(eventsSelector);
  const [event, setEvent] = useState(null);
  const { eventId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (events.length === 0) {
      dispatch(getEvents());
    }
  }, []);

  useEffect(() => {
    [...events].map((eventObj) => {
      if (Number(eventObj.id) === Number(eventId)) {
        setEvent(eventObj.attributes);
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
          <BackButton />
          <div className="container event-details-container">
            <div className="event-detail-info-row">
              <div className="img-wrapper">
                {event.banner?.data ? (
                  <img
                    className="event-banner"
                    src={url + event.banner.data?.attributes.url}
                    alt={language === "ua" ? "Банер турніру" : "Event banner"}
                  />
                ) : (
                  <img className="banner-placeholder" src={couple} />
                )}
              </div>
              <ul className="event-details">
                <li className="event-detail-info-title">{event.title}</li>
                <li>
                  <span className="event-detail-stroke-name">
                    {language === "ua" ? "Організація: " : "Organization: "}
                  </span>
                  {event.organizations?.data
                    ? event.organizations?.data
                        .map((organization) => organization.attributes.name)
                        .join(", ")
                    : language === "ua"
                    ? "Not specified"
                    : "Не вказано"}
                </li>
                <li>
                  <span className="event-detail-stroke-name">
                    {language === "ua" ? "Організатор: " : "Organizer: "}
                  </span>
                  {language === "ua" ? event.organizator : event.organizator_en}
                </li>
                <li>
                  <span className="event-detail-stroke-name">
                    {language === "ua" ? "Місто: " : "City: "}
                  </span>
                  {language === "ua" ? event.town : event.town_en}
                </li>
                <li>
                  <span className="event-detail-stroke-name">
                    {language === "ua" ? "Дата: " : "Data: "}
                  </span>
                  {event.end
                    ? `${dateToLocalFormat(event.start).slice(
                        0,
                        5
                      )} — ${dateToLocalFormat(event.end).slice(0, 5)}`
                    : dateToLocalFormat(event.start).slice(0, 5)}
                </li>
              </ul>
            </div>
            <div className="event-detail-info-row">
              <a
                target="_blank"
                rel="noreferrer"
                href={event.link || url + event.entry.data?.attributes.url}
                className={`btn event-info-btn ${
                  !event.entry.data && !event.link && "disabled"
                }`}
              >
                {language === "ua" ? "Інформація" : "Information"}
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href={event.judges}
                className={`btn event-info-btn ${!event.judges && "disabled"}`}
              >
                {language === "ua" ? "Судді" : "Judges"}
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href={event.registration}
                className={`btn event-info-btn black ${
                  !event.registration && "disabled"
                }`}
              >
                {language === "ua" ? "Реєстрація учасників" : "Registration"}
              </a>
            </div>
            <div className="event-detail-info-row">
              <ul className="event-detail-buttons">
                <li className="event-details-list active">
                  {language === "ua"
                    ? "Спонсори та партнери"
                    : "Sponsors and partners"}
                </li>
                <li className="event-details-list">
                  {language === "ua" ? "Готелі" : "Hotels"}
                </li>
                <li className="event-details-list">
                  {language === "ua" ? "Адреса" : "Address"}
                </li>
                <div className="indicator"></div>
              </ul>
            </div>
            <div
              className={`event-detail-information ${
                (info === "Спонсори та партнери" ||
                  info === "Sponsors and partners") &&
                "partners"
              }`}
            >
              {(info === "Спонсори та партнери" ||
                info === "Sponsors and partners") && (
                <div className="partners-wrapper">
                  {event.organizations.data.map((organization) => (
                    <PartnerCard
                      key={organization.id}
                      partner={organization.attributes}
                    />
                  ))}
                  {event.partners.data.map((partner) => (
                    <PartnerCard
                      key={partner.id}
                      partner={partner.attributes}
                    />
                  ))}
                </div>
              )}
              {(info === "Готелі" || info === "Hotels") && (
                <iframe
                  src={event.hotels}
                  width="100%"
                  height="490px"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              )}
              {(info === "Адреса" || info === "Address") && (
                <iframe
                  src={event.address}
                  width="100%"
                  height="490px"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              )}
            </div>
          </div>
        </article>
      ) : (
        <Loader />
      )}
    </>
  );
}
