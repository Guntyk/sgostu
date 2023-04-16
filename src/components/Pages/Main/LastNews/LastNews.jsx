import LastNewsCard from "./LastNewsCard/LastNewsCard";
import Button from "../../../../common/Button/Button";
import { EffectCoverflow, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useHistory } from "react-router-dom";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./LastNews.css";
import "swiper/css";

export default function LastNews({ articles }) {
  const language = window.localStorage.getItem("language");
  const history = useHistory();
  return (
    <article className="last-news">
      <span className="last-news-title">
        {language === "ua" ? "Останні новини" : "Latest news"}
      </span>
      <div className="container">
        <div className="last-news-wrapper">
          {articles.length !== 0 ? (
            articles
              .filter((article) => article.attributes.type === "Новина")
              .slice(-3)
              .reverse()
              .map((article) => (
                <LastNewsCard
                  key={article.id}
                  article={article.attributes}
                  articleId={article.id}
                />
              ))
          ) : (
            <span className="event-void">
              {language === "ua" ? "Новин немає" : "No news"}
            </span>
          )}
        </div>
      </div>
      <Swiper
        className="news-slider"
        spaceBetween={-80}
        initialSlide={1}
        grabCursor={true}
        slideToClickedSlide={true}
        effect={"coverflow"}
        pagination={true}
        centeredSlides={true}
        coverflowEffect={{ rotate: 0, slideShadows: false, scale: 0.8 }}
        modules={[EffectCoverflow, Pagination]}
      >
        {articles.length !== 0 ? (
          articles
            .filter((article) => article.attributes.type === "Новина")
            .slice(-3)
            .reverse()
            .map((article) => (
              <SwiperSlide key={article.id}>
                <LastNewsCard
                  key={article.id}
                  article={article.attributes}
                  articleId={article.id}
                />
              </SwiperSlide>
            ))
        ) : (
          <span className="event-void">
            {language === "ua" ? "Новин немає" : "No news"}
          </span>
        )}
      </Swiper>
      {articles.length !== 0 && (
        <Button
          buttonText={language === "ua" ? "Більше" : "More"}
          onClick={() => {
            history.push("/news");
          }}
        />
      )}
    </article>
  );
}
