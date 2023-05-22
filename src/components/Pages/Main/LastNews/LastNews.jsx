import LastNewsCard from "./LastNewsCard/LastNewsCard";
import Button from "../../../../common/Button/Button";
import { EffectCoverflow, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useHistory } from "react-router-dom";
import { ScrollTrigger } from "gsap/all";
import "swiper/css/effect-coverflow";
import { useEffect } from "react";
import "swiper/css/pagination";
import { gsap } from "gsap";
import "./LastNews.css";
import "swiper/css";

gsap.registerPlugin(ScrollTrigger);

export default function LastNews({ articles }) {
  const language = window.localStorage.getItem("language");
  const history = useHistory();
  // useEffect(() => {
  //   gsap.from(".news-section .last-news-card", {
  //     y: 50,
  //     opacity: 0,
  //     stagger: 0.5,
  //     duration: 1,
  //     scrollTrigger: {
  //       trigger: ".news-section .last-news-card",
  //       toggleActions: "restart pause resume pause",
  //     },
  //   });
  // }, []);
  return (
    <article className="last-news news-section">
      <span className="last-news-title">
        {language === "en" ? "Latest news" : "Останні новини"}
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
              {language === "en" ? "No news" : "Новин немає"}
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
            {language === "en" ? "No news" : "Новин немає"}
          </span>
        )}
      </Swiper>
      {articles.length !== 0 && (
        <Button
          buttonText={language === "en" ? "More" : "Більше"}
          onClick={() => {
            history.push("/news");
          }}
        />
      )}
    </article>
  );
}
