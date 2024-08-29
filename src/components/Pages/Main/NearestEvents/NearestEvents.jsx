import { EffectCoverflow, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ScrollTrigger } from 'gsap/all';
import { gsap } from 'gsap';
import { v4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import * as eventsSlice from 'redux/features/eventsSlice';
import EventCard from '../../Calendar/MonthSection/EventCard/EventCard';
import { ErrorMessage } from 'common/ErrorMessage/ErrorMessage';
import Loader from 'components/Loader/Loader';
import Button from 'common/Button/Button';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import './NearestEvents.css';
import 'swiper/css';

gsap.registerPlugin(ScrollTrigger);

export default function NearestEvents() {
  const isEventsRequestLoading = useSelector(({ events: { isLoading } }) => isLoading);
  const eventsRequestErrors = useSelector(({ events: { errors } }) => errors);
  const events = useSelector(({ events: { events } }) => events);

  const language = window.localStorage.getItem('language');
  const { push } = useHistory();
  const dispatch = useDispatch();
  const nearestEvents = events
    .map((event) => {
      if (event.attributes.organizations.data.map((org) => org.attributes.name === 'СГОСТУ').includes(true)) {
        return event;
      }
    })
    .filter((event) => event !== undefined)
    .slice(0, 3);

  useEffect(() => {
    if (events.length <= 1) {
      dispatch(eventsSlice.getEventsData());
    }
  }, []);

  return (
    events.length > 0 && (
      <article className='nearest-events'>
        <div className='nearest-events-title'>
          {[...Array(6)].map((_) => (
            <p>{language === 'en' ? 'The nearest events of SGOSTU' : 'Найближчі заходи СГОСТУ'}</p>
          ))}
        </div>
        <div className='nearest-events-wrapper'>
          {nearestEvents.length !== 0 &&
            nearestEvents.map(({ id, attributes }) => (
              <EventCard className='nearest-event-card' event={attributes} eventId={id} key={id} />
            ))}
        </div>
        <Swiper
          className='slider'
          spaceBetween={-80}
          initialSlide={1}
          grabCursor={true}
          slideToClickedSlide={true}
          effect={'coverflow'}
          pagination={true}
          coverflowEffect={{ rotate: 0, slideShadows: false, scale: 0.8 }}
          modules={[EffectCoverflow, Pagination]}
        >
          {/* {nearestEvents.length !== 0 ? (
            nearestEvents.map(({ id, attributes }) => (
              <SwiperSlide key={id}>
                <EventCard className='nearest-event-card' event={attributes} eventId={id} key={id} />
              </SwiperSlide>
            ))
          ) : (
            <span className='event-void'>
              {language === 'en' ? 'Unfortunately, there are no events' : 'На жаль, заходів немає'}
            </span>
          )} */}
        </Swiper>
        {nearestEvents.length !== 0 && (
          <Button
            buttonText='Більше'
            onClick={() => {
              push('/calendar');
            }}
          />
        )}
        {isEventsRequestLoading && <Loader />}
        {eventsRequestErrors.map((err) => (
          <ErrorMessage error={err} key={v4()} />
        ))}
      </article>
    )
  );
}
