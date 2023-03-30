import { getOrganizations } from "../../../redux/organizations/thunk";
import { orgsSelector } from "../../../redux/organizations/selectors";
import { eventsSelector } from "../../../redux/events/selectors";
import { getEvents } from "../../../redux/events/thunk";
import MonthSection from "./MonthSection/MonthSection";
import { useDispatch, useSelector } from "react-redux";
import gsap, { Back, Power2 } from "gsap";
import Loader from "../../Loader/Loader";
import { useEffect } from "react";
import "./Calendar.css";

export default function Calendar() {
  const calendarTL = gsap.timeline({ repeat: 0, repeatDelay: 1 });
  const organizations = useSelector(orgsSelector);
  const events = useSelector(eventsSelector);
  const dispatch = useDispatch();
  const monthsData = [
    "Січень",
    "Лютий",
    "Березень",
    "Квітень",
    "Травень",
    "Червень",
    "Липень",
    "Серпень",
    "Вересень",
    "Жовтень",
    "Листопад",
    "Грудень",
  ];
  const months = monthsData
    .filter((month) =>
      events
        .map((event) => new Date(event.attributes.start).getMonth())
        .includes(monthsData.indexOf(month))
    )
    .filter((month) => monthsData.indexOf(month) >= new Date().getMonth());

  useEffect(() => {
    if (events.length === 0) {
      dispatch(getEvents());
    }
    if (organizations.length === 0) {
      dispatch(getOrganizations());
    }
  }, []);

  // useEffect(() => {
  //   calendarTL.from(".calendar-title", {
  //     delay: 1,
  //     y: -250,
  //     duration: 0.5,
  //     ease: Power2.easeOut,
  //   });
  //   calendarTL.from(".calendar-month", {
  //     duration: 1,
  //     scale: 0,
  //     stagger: 0.3,
  //     ease: Back.easeOut.config(1.3),
  //   });
  // }, [events, months]);

  return (
    <>
      {events.length !== 0 && months.length !== 0 ? (
        <article className="calendar">
          <div className="container">
            <h1 className="calendar-title">Календар заходів на 2023 рік</h1>
          </div>
          {months.map((month) => (
            <MonthSection
              month={month}
              monthIdx={monthsData.indexOf(month)}
              key={month}
              events={events}
              organizations={organizations}
            />
          ))}
        </article>
      ) : (
        <Loader />
      )}
    </>
  );
}
