import NewsCard from "./NewsCard/NewsCard";
import { useContext } from "react";
import { Context } from "../../..";
import "./News.css";

export default function News() {
  const { news } = useContext(Context);
  return (
    <article className="news">
      <h1 className="news-title">Усі новини</h1>
      <div className="container news-wrapper">
        {news.length !== 0 ? (
          news.map((newspaper) => <NewsCard newspaper={newspaper} />)
        ) : (
          <span className="void">Новин немає</span>
        )}
      </div>
    </article>
  );
}
