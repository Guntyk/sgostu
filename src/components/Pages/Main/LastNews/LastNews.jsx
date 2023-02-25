import LastNewsCard from "./LastNewsCard/LastNewsCard";
import Button from "../../../../common/Button/Button";
import { useHistory } from "react-router-dom";
import { Context } from "../../../..";
import { useContext } from "react";
import "./LastNews.css";

export default function LastNews() {
  const history = useHistory();
  const { news } = useContext(Context);

  return (
    <article className="last-news">
      <span className="last-news-title">Останні новини</span>
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
