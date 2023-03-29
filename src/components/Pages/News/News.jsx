import LastNewsCard from "../Main/LastNews/LastNewsCard/LastNewsCard";
import { articlesSelector } from "../../../redux/articles/selectors";
import { getArticles } from "../../../redux/articles/thunk";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Loader/Loader";
import { useEffect } from "react";
import "./News.css";

export default function News() {
  const articles = useSelector(articlesSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    if (articles.length === 0) {
      dispatch(getArticles());
    }
  }, []);
  return (
    <>
      {articles.length !== 0 ? (
        <article className="news">
          <h1 className="news-title">Усі новини</h1>
          <div className="container news-wrapper">
            {articles.length !== 0 ? (
              articles
                .filter((article) => article.attributes.type === "Новина")
                .map((article) => (
                  <LastNewsCard
                    key={article.id}
                    articleId={article.id}
                    article={article.attributes}
                  />
                ))
            ) : (
              <span className="void">Новин немає</span>
            )}
          </div>
        </article>
      ) : (
        <Loader />
      )}
    </>
  );
}
