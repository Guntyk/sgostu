import MonthSection from "./MonthSection/MonthSection";
import "./Calendar.css";

export default function Calendar() {
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
          return <MonthSection month={month} monthIdx={months.indexOf(month)} key={month} />;
        })}
      </div>
    </article>
  );
}
