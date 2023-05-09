import LastNewsCard from "../LastNews/LastNewsCard/LastNewsCard";
import { EffectCoverflow, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import "swiper/css";

export default function Announcements({ articles }) {
  const language = window.localStorage.getItem("language");
  return (
    <article className="last-news announcements">
      <span className="last-news-title">
        {language === "en" ? "Announcements" : "Анонси"}
      </span>
      <div className="container">
        <div className="last-news-wrapper">
          {articles.length !== 0
            ? articles
                .filter((article) => article.attributes.type === "Анонс")
                .slice(-3)
                .reverse()
                .map((article) => (
                  <LastNewsCard
                    key={article.id}
                    article={article.attributes}
                    articleId={article.id}
                  />
                ))
            : console.log("Анонсів немає")}
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
        coverflowEffect={{ rotate: 0, slideShadows: false, scale: 0.8 }}
        modules={[EffectCoverflow, Pagination]}
      >
        {articles.length !== 0 ? (
          articles
            .filter((article) => article.attributes.type === "Анонс")
            .slice(-3)
            .reverse()
            .map((article) => (
              <SwiperSlide key={article.id}>
                <LastNewsCard
                  article={article.attributes}
                  articleId={article.id}
                />
              </SwiperSlide>
            ))
        ) : (
          <span className="event-void">
            {language === "en" ? "There is no news" : "Новин немає"}
          </span>
        )}
      </Swiper>
    </article>
  );
}
