import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { articlesSelector } from 'redux/articles/selectors';
import { eventsSelector } from 'redux/events/selectors';
import { getArticles } from 'redux/articles/thunk';
import { getEvents } from 'redux/events/thunk';
import Announcements from 'components/Pages/Main/Announcements/Announcements';
import NearestEvents from 'components/Pages/Main/NearestEvents/NearestEvents';
import Advantages from 'components/Pages/Main/Advantages/Advantages';
import Database from 'components/Pages/Main/Database/Database';
import Feedback from 'components/Pages/Main/Feedback/Feedback';
import LastNews from 'components/Pages/Main/LastNews/LastNews';
import About from 'components/Pages/Main/About/About';
import Hero from 'components/Pages/Main/Hero/Hero';

export default function Main() {
  const articles = useSelector(articlesSelector);
  const events = useSelector(eventsSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    if (events.length === 0) {
      dispatch(getEvents());
    }
    if (articles.length === 0) {
      dispatch(getArticles());
    }
  }, []);

  return (
    <main className='main'>
      <Hero />
      <About />
      <Advantages />
      <NearestEvents events={events} />
      <LastNews articles={articles} />
      <Database />
      <Announcements articles={articles} />
      <Feedback />
    </main>
  );
}
