import { dateToLocalFormat } from "../../../../helpers/dateToLocalFormat";
import { articlesSelector } from "../../../../redux/articles/selectors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getArticles } from "../../../../redux/articles/thunk";
import { faExpand } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import NotFound from "../../NotFound/NotFound";
import { useParams } from "react-router-dom";
import Loader from "../../../Loader/Loader";
import { useEffect } from "react";
import { useState } from "react";
import "./NewsInfo.css";

export default function NewsInfo() {
  const url = "https://backend-tbpix.ondigitalocean.app";
  const articles = useSelector(articlesSelector);
  const [article, setArticle] = useState(null);
  const { articleId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (articles.length === 0) {
      dispatch(getArticles());
    }
  }, []);

  useEffect(() => {
    articles.map((articleObj) => {
      if (Number(articleObj.id) === Number(articleId)) {
        setArticle(articleObj.attributes);
      }
    });
  }, [articles]);

  return (
    <>
      {article ? (
        article.type === "Новина" ? (
          <div className="article-info">
            <div className="container">
              <div className="article-wrapper">
                <div
                  className={`article-img-wrapper ${
                    article.media.data === null && "single"
                  }`}
                >
                  <div className="box">
                    <img
                      src={url + article.front.data.attributes.url}
                      alt="Головна фотографія новини"
                    />
                    <div className="hover">
                      <FontAwesomeIcon className="icon" icon={faExpand} />
                    </div>
                  </div>
                  {article.media.data &&
                    article.media.data.map((photo) => (
                      <div className="box" key={photo.id}>
                        <img
                          src={url + photo.attributes.url}
                          alt="Фотографія новини"
                        />
                        <div className="hover">
                          <FontAwesomeIcon className="icon" icon={faExpand} />
                        </div>
                      </div>
                    ))}
                </div>
                <div className="article-text-wrapper">
                  <h1 className="article-title">{article.title}</h1>
                  <span className="article-date">
                    {dateToLocalFormat(article.createdAt)}
                  </span>
                  <p className="article-description">{article.description}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <NotFound />
        )
      ) : (
        <Loader />
      )}
    </>
  );
}