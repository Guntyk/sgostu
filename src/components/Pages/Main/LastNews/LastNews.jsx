import LastNewsCard from "./LastNewsCard/LastNewsCard";
import Button from "../../../../common/Button/Button";
import { EffectCoverflow, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useHistory } from "react-router-dom";
import { Context } from "../../../..";
import "swiper/css/effect-coverflow";
import { useContext } from "react";
import "swiper/css/pagination";
import "./LastNews.css";
import "swiper/css";

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
        {news.length !== 0 ? (
          news.slice(0, 3).map((newspaper) => (
            <SwiperSlide key={newspaper.id}>
              <LastNewsCard newspaper={newspaper} />
            </SwiperSlide>
          ))
        ) : (
          <span className="event-void">Новин немає</span>
        )}
      </Swiper>
      {news.length !== 0 && (
        <Button
          buttonText="Більше"
          onClick={() => {
            history.push("/news");
          }}
        />
      )}
    </article>
  );
}
