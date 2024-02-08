import Button from 'common/Button/Button';
import { useHistory } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  const language = window.localStorage.getItem('language');
  const { replace } = useHistory();

  return (
    <article className='not-found'>
      {window.scrollTo(0, 0)}
      <div className='not-found-wrapper'>
        <h1 className='not-found-title'>404</h1>
        <p className='not-found-text'>
          <span>{language === 'en' ? 'Oops! This page does not exist 😔' : 'Ой! Такої сторінки не існує 😔'}</span>
        </p>
        <Button
          buttonText={language === 'en' ? 'Main' : 'На головну'}
          onClick={() => {
            replace('/');
          }}
        />
      </div>
    </article>
  );
}
