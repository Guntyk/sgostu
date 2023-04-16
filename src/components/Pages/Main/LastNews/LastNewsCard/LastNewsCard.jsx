import { dateToLocalFormat } from "../../../../../helpers/dateToLocalFormat";
import Button from "../../../../../common/Button/Button";
import { LanguageContext } from "../../../../../App";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { useState } from "react";
import "./LastNewsCard.css";

export default function LastNewsCard({ article, articleId }) {
  const { language } = useContext(LanguageContext);
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
              alt={language === "ua" ? "Фотографія новини" : "News photo"}
            />
          </div>
          <span className="news-card-date">
            {dateToLocalFormat(article.createdAt)}
          </span>
          <span className="news-card-title">
            {language === "ua" ? article.title : article.title_en}
          </span>
          <Button
            className="event-details-btn news-link"
            buttonText={language === "ua" ? "Детальніше" : "More"}
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
