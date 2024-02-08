import { getOrganizations } from 'redux/organizations/thunk';
import { orgsSelector } from 'redux/organizations/selectors';
import { eventsSelector } from 'redux/events/selectors';
import { getEvents } from 'redux/events/thunk';
import MonthSection from './MonthSection/MonthSection';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'components/Loader/Loader';
import { useEffect } from 'react';
import './Calendar.css';

export default function Calendar() {
  const language = window.localStorage.getItem('language');
  const organizations = useSelector(orgsSelector);
  const events = useSelector(eventsSelector);
  const dispatch = useDispatch();
  const monthsDataUA = [
    'Січень',
    'Лютий',
    'Березень',
    'Квітень',
    'Травень',
    'Червень',
    'Липень',
    'Серпень',
    'Вересень',
    'Жовтень',
    'Листопад',
    'Грудень',
  ];
  const monthsDataEN = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  useEffect(() => {
    if (events.length === 0) {
      dispatch(getEvents());
    }
    if (organizations.length === 0) {
      dispatch(getOrganizations());
    }
  }, []);

  const months =
    language === 'en'
      ? monthsDataEN
          .filter((month) =>
            events.map(({ attributes: { start } }) => new Date(start).getMonth()).includes(monthsDataEN.indexOf(month))
          )
          .filter((month) => monthsDataEN.indexOf(month) >= new Date().getMonth())
      : monthsDataUA
          .filter((month) =>
            events.map(({ attributes: { start } }) => new Date(start).getMonth()).includes(monthsDataUA.indexOf(month))
          )
          .filter((month) => monthsDataUA.indexOf(month) >= new Date().getMonth());

  return (
    <article className='calendar'>
      <div className='container'>
        <h1 className='calendar-title'>
          {language === 'en' ? 'Calendar of events for 2023' : 'Календар заходів на 2023 рік'}
        </h1>
      </div>
      {events.length !== 0 && months.length !== 0 ? (
        months.map((month) => (
          <MonthSection
            month={month}
            monthIdx={language === 'en' ? monthsDataEN.indexOf(month) : monthsDataUA.indexOf(month)}
            key={month}
            events={events}
            organizations={organizations}
          />
        ))
      ) : (
        <Loader />
      )}
    </article>
  );
}
