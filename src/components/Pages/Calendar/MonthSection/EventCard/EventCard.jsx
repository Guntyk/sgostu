import trofey from 'materials/icons/calendar-card/trofey.png';
import master from 'materials/icons/calendar-card/master.png';
import SpartakIcon from 'materials/icons/categories/Spartak';
import { dateToLocalFormat } from 'helpers/dateToLocalFormat';
import crowd from 'materials/icons/calendar-card/crowd.png';
import GlobeIcon from 'materials/icons/categories/Globe';
import StarIcon from 'materials/icons/categories/Star';
import Button from 'common/Button/Button';
import { useHistory } from 'react-router-dom';
import './EventCard.css';

export default function EventCard({ event, eventId, className }) {
  const language = window.localStorage.getItem('language');
  const { push } = useHistory();

  function Category({ type }) {
    if (type === 'Змагання') {
      return <img src={trofey} />;
    }
    if (type === 'Збори') {
      return <img src={crowd} />;
    }
    if (type === 'Майстер-клас') {
      return <img src={master} />;
    }
  }

  return (
    <div className={`event-card ${className}`}>
      <span className='event-date'>
        {dateToLocalFormat(event.start).slice(0, 5)}
        {event.end && ' — ' + dateToLocalFormat(event.end).slice(0, 5)}
      </span>
      <span className='event-town'>{language === 'en' ? event.town_en : event.town}</span>
      <p className='event-title'>{event.title}</p>
      <div className='event-categories'>
        <Category type={event.type} />
        {event.foreign && <GlobeIcon />}
        {event.rating && <StarIcon />}
        {event.spartak && <SpartakIcon />}
      </div>
      <p className='event-organizer'>{language === 'en' ? event.organizator_en : event.organizator}</p>
      <Button
        className='event-more event-details-btn'
        buttonText={language === 'en' ? 'More' : 'Більше'}
        onClick={() => {
          push(`/calendar/${eventId}`);
        }}
      />
    </div>
  );
}
