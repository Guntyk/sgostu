import { dateToLocalFormat } from "../../../../../helpers/dateToLocalFormat";
import Button from "../../../../../common/Button/Button";
import { useHistory } from "react-router-dom";
import "./LastNewsCard.css";

export default function LastNewsCard({ article, articleId }) {
  const { push } = useHistory();
  return (
    <>
      {article !== undefined ? (
        <div className="last-news-card">
          <div className="news-img-wrapper">
            <img
              className="news-img"
              src={`https://backend-tbpix.ondigitalocean.app${article.front.data.attributes.url}`}
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
        <span>Помилка</span>
      )}
    </>
  );
}
