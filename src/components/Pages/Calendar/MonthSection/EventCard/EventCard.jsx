import SgostuIcon from "../../../../../materials/icons/categories/Sgostu";
import StarIcon from "../../../../../materials/icons/categories/Star";
import GlobeIcon from "../../../../../materials/icons/categories/Globe";
import { useEffect, useState } from "react";
import "./EventCard.css";
import { Link } from "react-router-dom";

export default function EventCard({ event }) {
  const localeDate = new Date(event.start).toLocaleDateString("uk-UA");
  const [empty, setEmpty] = useState("");
  useEffect(() => {
    if (event.rating || event.foreign || event.organization.indexOf("СГОСТУ") >= 0) setEmpty("hide-categories");
  }, []);

  const cardClassName = `event-card ${empty}`;

  return (
    <div className={cardClassName}>
      <span className="event-date">{localeDate}</span>
      <div className="event-categories">
        {event.rating && <StarIcon />}
        {event.organization.indexOf("СГОСТУ") >= 0 && <SgostuIcon />}
        {event.foreign && <GlobeIcon />}
      </div>
      <span className="event-town">{event.town}</span>
      <span className="event-title">{event.title}</span>
      <span className="event-status">{event.status}</span>
      <Link to="/" className="event-more">
        Більше
      </Link>
    </div>
  );
}
