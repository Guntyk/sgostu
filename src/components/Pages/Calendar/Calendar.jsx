import { eventsSelector } from "../../../redux/events/selectors";
import { fetchEvents } from "../../../redux/events/thunk";
import { useDispatch, useSelector } from "react-redux";
import MonthSection from "./MonthSection/MonthSection";
import { useEffect } from "react";
import "./Calendar.css";

export default function Calendar() {
  useEffect(() => {
    dispatch(fetchEvents());
  }, []);
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

  return (
    <article className="calendar">
      <div className="container">
        <h1 className="calendar-title">Календар заходів на 2023 рік</h1>
        {months.map((month) => {
          return (
            <MonthSection
              month={month}
              monthIdx={months.indexOf(month)}
              key={month}
              events={events}
            />
          );
        })}
      </div>
    </article>
  );
}
