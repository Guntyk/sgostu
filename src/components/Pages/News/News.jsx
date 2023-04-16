import LastNewsCard from "../Main/LastNews/LastNewsCard/LastNewsCard";
import { articlesSelector } from "../../../redux/articles/selectors";
import { getArticles } from "../../../redux/articles/thunk";
import { useDispatch, useSelector } from "react-redux";
import { LanguageContext } from "../../../App";
import Loader from "../../Loader/Loader";
import gsap, { Power2 } from "gsap";
import { useContext } from "react";
import { useEffect } from "react";
import "./News.css";

export default function News() {
  const { language } = useContext(LanguageContext);
  const newsTL = gsap.timeline({ repeat: 0, ease: Power2.easeOut });
  const articles = useSelector(articlesSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (articles.length === 0) {
      dispatch(getArticles());
    }
  }, []);

  useEffect(() => {
    newsTL.from(".news-title", {
      delay: 0.5,
      duration: 0.5,
      y: -100,
    });
    newsTL.from(
      ".last-news-card",
      {
        duration: 0.7,
        y: 50,
        opacity: 0,
        stagger: 0.15,
      },
      "-=0.1"
    );
  }, [articles]);

  return (
    <>
      {articles.length !== 0 ? (
        <article className="news">
          <h1 className="news-title">
            {language === "ua" ? "Усі новини" : "All news"}
          </h1>
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
              <span className="void">
                {language === "ua" ? "Новин немає" : "There is no news"}
              </span>
            )}
          </div>
        </article>
      ) : (
        <Loader />
      )}
    </>
  );
}
