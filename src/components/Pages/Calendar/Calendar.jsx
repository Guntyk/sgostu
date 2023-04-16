import { getOrganizations } from "../../../redux/organizations/thunk";
import { orgsSelector } from "../../../redux/organizations/selectors";
import { eventsSelector } from "../../../redux/events/selectors";
import { getEvents } from "../../../redux/events/thunk";
import MonthSection from "./MonthSection/MonthSection";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Loader/Loader";
import { useEffect } from "react";
import "./Calendar.css";

export default function Calendar() {
  const language = window.localStorage.getItem("language");
  const organizations = useSelector(orgsSelector);
  const events = useSelector(eventsSelector);
  const dispatch = useDispatch();
  const monthsDataUA = [
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
  const monthsDataEN = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    if (events.length === 0) {
      dispatch(getEvents());
    }
    if (organizations.length === 0) {
      dispatch(getOrganizations());
    }
  }, []);

  const months =
    language === "ua"
      ? monthsDataUA
          .filter((month) =>
            events
              .map((event) => new Date(event.attributes.start).getMonth())
              .includes(monthsDataUA.indexOf(month))
          )
          .filter(
            (month) => monthsDataUA.indexOf(month) >= new Date().getMonth()
          )
      : monthsDataEN
          .filter((month) =>
            events
              .map((event) => new Date(event.attributes.start).getMonth())
              .includes(monthsDataEN.indexOf(month))
          )
          .filter(
            (month) => monthsDataEN.indexOf(month) >= new Date().getMonth()
          );

  return (
    <>
      {events.length !== 0 && months.length !== 0 ? (
        <article className="calendar">
          <div className="container">
            <h1 className="calendar-title">
              {language === "ua"
                ? "Календар заходів на 2023 рік"
                : "Calendar of events for 2023"}
            </h1>
          </div>
          {months.map((month) => (
            <MonthSection
              month={month}
              monthIdx={
                language === "ua"
                  ? monthsDataUA.indexOf(month)
                  : monthsDataEN.indexOf(month)
              }
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
