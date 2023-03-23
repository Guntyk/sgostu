import LastNewsCard from "../LastNews/LastNewsCard/LastNewsCard";
import { EffectCoverflow, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import "swiper/css";

export default function Announcements({ articles }) {
  return (
    <article className="last-news announcements">
      <span className="last-news-title">Анонси</span>
      <div className="container">
        <div className="last-news-wrapper">
          {articles.length !== 0
            ? articles
                .slice(0, 3)
                .filter((article) => article.attributes.type === "Анонс")
                .map((article) => (
                  <LastNewsCard key={article.id} article={article.attributes} />
                ))
            : console.log("Новин немає")}
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
            .slice(0, 3)
            .filter((article) => article.attributes.type === "Анонс")
            .map((article) => (
              <SwiperSlide key={article.id}>
                <LastNewsCard article={article.attributes} />
              </SwiperSlide>
            ))
        ) : (
          <span className="event-void">Новин немає</span>
        )}
      </Swiper>
    </article>
  );
}
