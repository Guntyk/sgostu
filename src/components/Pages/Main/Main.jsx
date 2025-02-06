import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { articlesSelector } from 'redux/articles/selectors';
import { getArticles } from 'redux/articles/thunk';
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
  const dispatch = useDispatch();

  useEffect(() => {
    if (articles.length === 0) {
      dispatch(getArticles());
    }
  }, []);

  return (
    <main className='main'>
      <Hero />
      <About />
      <Advantages />
      <NearestEvents />
      <LastNews articles={articles} />
      <Database />
      <Feedback />
    </main>
  );
}
