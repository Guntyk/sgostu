import "./NearestEventSlide.css";

export default function NearestEventSlide({ event }) {
  return (
    <div className="nearest-event-card">
      <span className="nearest-event-name">{event.attributes.title}</span>
      <div className="nearest-event-info">
        <span className="nearest-event-town">{event.attributes.town}</span>
        <span className="nearest-event-date">{event.attributes.start}</span>
      </div>
      <svg
        className="event-arrow"
        width="90"
        height="8"
        viewBox="0 0 90 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M89.3536 4.35355C89.5488 4.15829 89.5488 3.84171 89.3536 3.64645L86.1716 0.464466C85.9763 0.269204 85.6597 0.269204 85.4645 0.464466C85.2692 0.659728 85.2692 0.976311 85.4645 1.17157L88.2929 4L85.4645 6.82843C85.2692 7.02369 85.2692 7.34027 85.4645 7.53553C85.6597 7.7308 85.9763 7.7308 86.1716 7.53553L89.3536 4.35355ZM0 4.5H89V3.5H0V4.5Z"
          fill="#272500"
        />
      </svg>
    </div>
  );
}
