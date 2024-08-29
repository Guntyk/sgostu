import { dateToLocalFormat } from 'helpers/dateToLocalFormat';
import Button from 'common/Button/Button';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import './LastNewsCard.css';

export default function LastNewsCard({ article, articleId }) {
  const language = window.localStorage.getItem('language');
  const [openCard, setOpenCard] = useState(false);
  const { push } = useHistory();

  return (
    <>
      {article ? (
        <div
          className={`last-news-card ${openCard ? 'active' : ''}`}
          onClick={() => {
            setOpenCard(!openCard);
          }}
        >
          <div className='news-img-wrapper'>
            <img
              className='news-img'
              src={`https://sgostu-backend.download${article?.front?.data?.attributes.url}`}
              alt={language === 'en' ? 'News photo' : 'Фотографія новини'}
            />
          </div>
          <span className='news-card-date'>{dateToLocalFormat(article.createdAt)}</span>
          <span className='news-card-title'>{language === 'en' ? article.title_en : article.title}</span>
          <Button
            className='event-details-btn news-link'
            buttonText={language === 'en' ? 'More' : 'Детальніше'}
            onClick={() => {
              push(`/news/${articleId}`);
            }}
          />
        </div>
      ) : (
        <span>{language === 'en' ? 'Error' : 'Помилка'}</span>
      )}
    </>
  );
}
