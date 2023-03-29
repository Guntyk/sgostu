import { dateToLocalFormat } from "../../../../../helpers/dateToLocalFormat";
import trofey from "../../../../../materials/icons/calendar-card/trofey.png";
import master from "../../../../../materials/icons/calendar-card/master.png";
import SpartakIcon from "../../../../../materials/icons/categories/Spartak";
import crowd from "../../../../../materials/icons/calendar-card/crowd.png";
import SgostuIcon from "../../../../../materials/icons/categories/Sgostu";
import GlobeIcon from "../../../../../materials/icons/categories/Globe";
import StarIcon from "../../../../../materials/icons/categories/Star";
import Button from "../../../../../common/Button/Button";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import "./EventCard.css";

export default function EventCard({ event, eventId }) {
  // console.log(
  //   ...event.organizations.data.map(
  //     (organization) => organization.attributes.name === "СГОСТУ"
  //   )
  // );
  const [empty, setEmpty] = useState("");
  // useEffect(() => {
  //   if (event.spartak || event.rating || event.foreign)
  //     setEmpty("hide-categories");
  // }, []);

  function Category({ type }) {
    if (type === "Змагання") {
      return <img src={trofey} />;
    }
    if (type === "Збори") {
      return <img src={crowd} />;
    }
    if (type === "Майстер-клас") {
      return <img src={master} />;
    }
  }

  const cardClassName = `event-card ${empty}`;
  const { push } = useHistory();

  return (
    <div className={cardClassName}>
      <span className="event-date">
        {dateToLocalFormat(event.start).slice(0, 5)}
      </span>
      <span className="event-town">{event.town}</span>
      <p className="event-title">{event.title}</p>
      <div className="event-categories">
        <Category type={event.type} />
        {event.foreign && <GlobeIcon />}
        {event.rating && <StarIcon />}
        {event.spartak && <SpartakIcon />}
      </div>
      <p className="event-organizer">{event.organizator}</p>
      <Button
        className="event-more event-details-btn"
        buttonText="Більше"
        onClick={() => {
          push(`/calendar/${eventId}`);
        }}
      />
    </div>
  );
}
