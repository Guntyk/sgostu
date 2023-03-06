import { eventsSelector } from "../../../redux/events/selectors";
import { getEvents } from "../../../redux/events/thunk";
import MonthSection from "./MonthSection/MonthSection";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Loader/Loader";
import { useEffect } from "react";
import "./Calendar.css";

export default function Calendar() {
  const dispatch = useDispatch();
  const events = useSelector(eventsSelector);
  useEffect(() => {
    if (events.length === 0) {
      dispatch(getEvents());
    }
  }, []);

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
    <>
      {events.length !== 0 ? (
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
      ) : (
        <Loader />
      )}
    </>
  );
}
