import { useContext } from "react";
import { Context } from "../../../..";
import { EffectCoverflow, Pagination } from "swiper";
import "swiper/css/pagination";
import "swiper/css";
import LastNewsCard from "../LastNews/LastNewsCard/LastNewsCard";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Announcements() {
  const { announcements } = useContext(Context);

  return (
    <article className="last-news announcements">
      <span className="news-title">Анонси</span>
      <div className="container">
        <div className="last-news-wrapper">
          {announcements.length !== 0
            ? announcements
                .slice(0, 3)
                .map((announcement) => (
                  <LastNewsCard
                    key={announcement.id}
                    newspaper={announcement}
                  />
                ))
            : alert("No news")}
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
        {announcements.length !== 0 ? (
          announcements.slice(0, 3).map((newspaper) => (
            <SwiperSlide key={newspaper.id}>
              <LastNewsCard newspaper={newspaper} />
            </SwiperSlide>
          ))
        ) : (
          <span className="event-void">Новин немає</span>
        )}
      </Swiper>
    </article>
  );
}
