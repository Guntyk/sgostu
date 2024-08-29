import { v4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as eventsSlice from 'redux/features/eventsSlice';
import { dateToLocalFormat } from 'helpers/dateToLocalFormat';
import { backendURL } from 'constants/backendURL';
import { ErrorMessage } from 'common/ErrorMessage/ErrorMessage';
import BackButton from 'common/BackButton/BackButton';
import PartnerCard from './PartnerCard/PartnerCard';
import Loader from 'components/Loader/Loader';
import couple from 'materials/icons/calendar-card/couple.png';
import './EventInfo.css';

export default function EventInfo() {
  const isEventsRequestLoading = useSelector(({ events: { isLoading } }) => isLoading);
  const eventsRequestErrors = useSelector(({ events: { errors } }) => errors);
  const events = useSelector(({ events: { events } }) => events);

  const language = window.localStorage.getItem('language');
  const [info, setInfo] = useState('Спонсори та партнери');
  const [event, setEvent] = useState(null);
  const { eventId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (events.length === 0) {
      dispatch(eventsSlice.getEventsData());
    }
  }, []);

  useEffect(() => {
    const eventObj = events.find(({ id }) => Number(id) === Number(eventId));
    if (eventObj) {
      setEvent(eventObj.attributes);
    }
  }, [events]);

  useEffect(() => {
    if (event) {
      const list = document.querySelectorAll('.event-details-list');

      function activeLink() {
        list.forEach(({ classList }) => classList.remove('active'));
        this.classList.add('active');
        setInfo(this.innerText);
      }

      list.forEach((item) => item.addEventListener('click', activeLink));
    }
  }, [event]);

  const {
    banner,
    title,
    organizator_en,
    organizator,
    town_en,
    town,
    link,
    judges,
    registration,
    partners,
    hotels,
    address,
    entry,
    start,
    end,
  } = event || {};

  return (
    <article className='event-info'>
      <BackButton />
      {event && (
        <div className='container event-details-container'>
          <div className='event-detail-info-row'>
            <div className='img-wrapper'>
              {banner?.data ? (
                <img
                  className='event-banner'
                  src={`${backendURL}${banner.data?.attributes.url}`}
                  alt={language === 'en' ? 'Банер турніру' : 'Event banner'}
                />
              ) : (
                <img className='banner-placeholder' src={couple} />
              )}
            </div>
            <ul className='event-details'>
              <li className='event-detail-info-title'>{title}</li>
              <li>
                <span className='event-detail-stroke-name'>
                  {language === 'en' ? 'Organization: ' : 'Організація: '}
                </span>
                {event.organizations?.data
                  ? event.organizations?.data.map(({ attributes: { name } }) => name).join(', ')
                  : language === 'en'
                  ? 'Not specified'
                  : 'Не вказано'}
              </li>
              <li>
                <span className='event-detail-stroke-name'>{language === 'en' ? 'Organizer: ' : 'Організатор: '}</span>
                {language === 'en' ? organizator_en : organizator}
              </li>
              <li>
                <span className='event-detail-stroke-name'>{language === 'en' ? 'City: ' : 'Місто: '}</span>
                {language === 'en' ? town_en : town}
              </li>
              <li>
                <span className='event-detail-stroke-name'>{language === 'en' ? 'Data: ' : 'Дата: '}</span>
                {end
                  ? `${dateToLocalFormat(start).slice(0, 5)} — ${dateToLocalFormat(end).slice(0, 5)}`
                  : dateToLocalFormat(start).slice(0, 5)}
              </li>
            </ul>
          </div>
          <div className='event-detail-info-row'>
            <a
              target='_blank'
              rel='noreferrer'
              href={link || `${backendURL}${entry.data?.attributes.url}`}
              className={`btn event-info-btn ${!entry.data && !link && 'disabled'}`}
            >
              {language === 'en' ? 'Information' : 'Інформація'}
            </a>
            <a target='_blank' rel='noreferrer' href={judges} className={`btn event-info-btn ${!judges && 'disabled'}`}>
              {language === 'en' ? 'Judges' : 'Судді'}
            </a>
            <a
              target='_blank'
              rel='noreferrer'
              href={registration}
              className={`btn event-info-btn black ${!registration && 'disabled'}`}
            >
              {language === 'en' ? 'Registration' : 'Реєстрація учасників'}
            </a>
          </div>
          <div className='event-detail-info-row'>
            <ul className='event-detail-buttons'>
              <li className='event-details-list active'>
                {language === 'en' ? 'Sponsors and partners' : 'Спонсори та партнери'}
              </li>
              <li className='event-details-list'>{language === 'en' ? 'Hotels' : 'Готелі'}</li>
              <li className='event-details-list'>{language === 'en' ? 'Address' : 'Адреса'}</li>
              <div className='indicator'></div>
            </ul>
          </div>
          <div
            className={`event-detail-information ${
              (info === 'Спонсори та партнери' || info === 'Sponsors and partners') && 'partners'
            }`}
          >
            {(info === 'Спонсори та партнери' || info === 'Sponsors and partners') && (
              <div className='partners-wrapper'>
                {event.organizations.data.map(({ id, attributes }) => (
                  <PartnerCard key={id} partner={attributes} />
                ))}
                {partners.data.map(({ id, attributes }) => (
                  <PartnerCard key={id} partner={attributes} />
                ))}
              </div>
            )}
            {(info === 'Готелі' || info === 'Hotels') && (
              <iframe
                src={hotels}
                width='100%'
                height='490px'
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
              />
            )}
            {(info === 'Адреса' || info === 'Address') && (
              <iframe
                src={address}
                width='100%'
                height='490px'
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
              />
            )}
          </div>
        </div>
      )}
      {isEventsRequestLoading && <Loader />}
      {eventsRequestErrors.map((err) => (
        <ErrorMessage error={err} key={v4()} />
      ))}
    </article>
  );
}
