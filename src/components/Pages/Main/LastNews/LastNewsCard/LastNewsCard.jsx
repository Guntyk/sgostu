import { dateToLocalFormat } from "../../../../../helpers/dateToLocalFormat";
import Button from "../../../../../common/Button/Button";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import "./LastNewsCard.css";

export default function LastNewsCard({ article, articleId }) {
  const [openCard, setOpenCard] = useState(false);
  const { push } = useHistory();
  return (
    <>
      {article ? (
        <div
          className={`last-news-card ${openCard ? "active" : ""}`}
          onClick={() => {
            setOpenCard(!openCard);
          }}
        >
          <div className="news-img-wrapper">
            <img
              className="news-img"
              src={`https://sgostu-backend.download${article.front.data.attributes.url}`}
              alt="Фотографія новини"
            />
          </div>
          <span className="news-card-date">
            {dateToLocalFormat(article.createdAt)}
          </span>
          <span className="news-card-title">{article.title}</span>
          <Button
            className="event-details-btn news-link"
            buttonText="Детальніше"
            onClick={() => {
              push(`/news/${articleId}`);
            }}
          />
        </div>
      ) : (
        <span>{language === "ua" ? "Помилка" : "Error"}</span>
      )}
    </>
  );
}
