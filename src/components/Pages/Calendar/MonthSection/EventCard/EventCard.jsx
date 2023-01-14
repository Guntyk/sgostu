import UkraineIcon from "../../../../../materials/icons/categories/Ukraine";
import SgostuIcon from "../../../../../materials/icons/categories/Sgostu";
import StarIcon from "../../../../../materials/icons/categories/Star";
import GlobeIcon from "../../../../../materials/icons/categories/Globe";
import { useEffect, useState } from "react";
import "./EventCard.css";

export default function EventCard({ event }) {
  const localeDate = new Date(event.start).toLocaleDateString("uk-UA");
  const [empty, setEmpty] = useState("");
  console.log(event)
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
        <UkraineIcon />
      </div>
      <span className="event-town">{event.town}</span>
      <span className="event-title">{event.title}</span>
      <span className="event-status">{event.status}</span>
      <a href="/" className="event-more">
        Більше
      </a>
    </div>
  );
}
