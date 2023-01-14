import { eventsSelector } from "../../../redux/events/selectors";
import { fetchEvents } from "../../../redux/events/thunk";
import { useDispatch, useSelector } from "react-redux";
import MonthSection from "./MonthSection/MonthSection";
import { useEffect } from "react";
import "./Calendar.css";

export default function Calendar() {
  const events = useSelector(eventsSelector);
  const dispatch = useDispatch();
  const months = [
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

  useEffect(() => {
    dispatch(fetchEvents());
  }, []);

  return (
    <article className="calendar">
      <div className="container">
        <h1 className="calendar-title">Календар заходів на 2023 рік</h1>
        {months.map((month) => {
          return <MonthSection month={month} events={events} key={month} />;
        })}
      </div>
    </article>
  );
}
