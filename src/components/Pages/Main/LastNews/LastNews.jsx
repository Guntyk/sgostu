import LastNewsCard from "./LastNewsCard/LastNewsCard";
import Button from "../../../../common/Button/Button";
import { useHistory } from "react-router-dom";
import "./LastNews.css";

export default function LastNews() {
  const history = useHistory();
  const news = [
    {
      id: 1,
      date: "2022-01-28",
      title: "Вітаємо зі сріблом!",
      description:
        "Вероніка Мишко – Ерл Вільямсон Чемпіонат Світу дорослі 10 танців (Братислава) WDSF World Championship in Bratisla...",
    },
    {
      id: 2,
      date: "2022-02-12",
      title: "Чемпіонат Світу серед команд...",
      description:
        "Команда формейшн з клубу танцювального спорту “Адажіо” м.Ірпінь посіла у фіналі 5 місце!",
    },
    {
      id: 3,
      date: "2022-03-31",
      title: "Вітаємо Артема та Єлизавету!",
      description:
        "А також тренера Анну Кривенкоз першою Українською медаллю на GOC 2022!",
    },
  ];

  return (
    <article className="last-news">
      <span className="news-title">Останні новини</span>
      <div className="container">
        <div className="last-news-wrapper">
          {news.length !== 0 ? (
            news
              .slice(0, 3)
              .map((newspaper) => (
                <LastNewsCard key={newspaper.id} newspaper={newspaper} />
              ))
          ) : (
            <span className="event-void">Новин немає</span>
          )}
        </div>
      </div>
      {news.length !== 0 && (
        <Button
          buttonText="Більше"
          onClick={() => {
            history.push("/");
          }}
        />
      )}
    </article>
  );
}
