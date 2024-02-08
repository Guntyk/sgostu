import gsap, { Power2 } from 'gsap';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { articlesSelector } from 'redux/articles/selectors';
import { getArticles } from 'redux/articles/thunk';
import LastNewsCard from 'components/Pages/Main/LastNews/LastNewsCard/LastNewsCard';
import Loader from 'components/Loader/Loader';
import 'components/Pages/News/News.css';

export default function News() {
  const language = window.localStorage.getItem('language');
  const newsTL = gsap.timeline({ repeat: 0, ease: Power2.easeOut });
  const articles = useSelector(articlesSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (articles.length === 0) {
      dispatch(getArticles());
    }
  }, []);

  useEffect(() => {
    newsTL.from('.news-title', {
      delay: 0.5,
      duration: 0.5,
      y: -100,
    });
    newsTL.from(
      '.last-news-card',
      {
        duration: 0.7,
        y: 50,
        opacity: 0,
        stagger: 0.15,
      },
      '-=0.1'
    );
  }, [articles]);

  return (
    <>
      {articles.length > 0 ? (
        <article className='news'>
          <h1 className='news-title'>{language === 'en' ? 'All news' : 'Усі новини'}</h1>
          <div className='container news-wrapper'>
            {articles.length !== 0 ? (
              articles
                .filter(({ attributes: { type } }) => type === 'Новина')
                .reverse()
                .map(({ id, attributes }) => <LastNewsCard key={id} articleId={id} article={attributes} />)
            ) : (
              <span className='void'>{language === 'en' ? 'There is no news' : 'Новин немає'}</span>
            )}
          </div>
        </article>
      ) : (
        <Loader />
      )}
    </>
  );
}
