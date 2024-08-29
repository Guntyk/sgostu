import { v4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import * as organizationsSlice from 'redux/features/organizationsSlice';
import * as eventsSlice from 'redux/features/eventsSlice';
import { toUniqueArray } from 'helpers/toUniqueArray';
import { monthsDataEN, monthsDataUA } from 'constants/moths';
import { ErrorMessage } from 'common/ErrorMessage/ErrorMessage';
import MonthSection from './MonthSection/MonthSection';
import Loader from 'components/Loader/Loader';
import './Calendar.css';

export default function Calendar() {
  const isEventsRequestLoading = useSelector(({ events: { isLoading } }) => isLoading);
  const eventsRequestErrors = useSelector(({ events: { errors } }) => errors);
  const events = useSelector(({ events: { events } }) => events);

  const isOrganizationsRequestLoading = useSelector(({ organizations: { isLoading } }) => isLoading);
  const organizationsRequestErrors = useSelector(({ organizations: { errors } }) => errors);
  const organizations = useSelector(({ organizations: { organizations } }) => organizations);

  const language = window.localStorage.getItem('language');
  const dispatch = useDispatch();

  useEffect(() => {
    if (events.length <= 1) {
      dispatch(eventsSlice.getEventsData());
    }
    if (organizations.length === 0) {
      dispatch(organizationsSlice.getOrganizationsData());
    }
  }, []);

  const yearsPairString = `${new Date().getFullYear()} - ${new Date().getFullYear() + 1}`;

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
          {language === 'en'
            ? `Calendar of events for ${yearsPairString}`
            : `Календар заходів на ${yearsPairString} рік`}
        </h1>
      </div>
      {events.length > 0 &&
        organizations.length > 0 &&
        months.map((month) => (
          <MonthSection
            month={month}
            monthIdx={language === 'en' ? monthsDataEN.indexOf(month) : monthsDataUA.indexOf(month)}
            key={month}
            events={events}
            organizations={organizations}
          />
        ))}
      {(isEventsRequestLoading || isOrganizationsRequestLoading) && <Loader />}
      {toUniqueArray([...eventsRequestErrors, ...organizationsRequestErrors]).map((err) => (
        <ErrorMessage error={err} key={v4()} />
      ))}
    </article>
  );
}
