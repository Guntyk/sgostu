import { ScrollTrigger } from 'gsap/all';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import './Advantages.css';

gsap.registerPlugin(ScrollTrigger);

export default function Advantages() {
  const language = window.localStorage.getItem('language');

  useEffect(() => {
    gsap.from('.advantage-card', {
      xPercent: -600,
      duration: 1,
      opacity: 0,
      stagger: {
        each: 0.25,
        from: 'end',
      },
      scrollTrigger: {
        trigger: '.advantages',
        start: '30% bottom',
        toggleActions: 'restart pause resume pause',
      },
    });
  }, []);

  return (
    <article className='advantages'>
      <div className='cards-wrapper'>
        <div className='advantage-card'>{language === 'en' ? 'Our advantages' : 'Наші переваги'}</div>
        <div className='advantage-card'>
          {language === 'en' ? 'Electronic books of dancers' : 'Електронні книжки танцюристів'}
        </div>
        <div className='advantage-card'>
          {language === 'en' ? 'Assignment of sports categories' : 'Присвоєння спортивних розрядів'}
        </div>
        <div className='advantage-card'>
          {language === 'en' ? 'Support of regional championships' : 'Підтримка обласних чемпіонатів'}
        </div>
        <div className='advantage-card'>
          {language === 'en'
            ? 'Cooperation with organizations of Eastern European countries'
            : 'Співпраця з організаціями країн Східної Європи'}
        </div>
        <div className='advantage-card'>
          {language === 'en' ? 'Benefits for dancers at tournaments' : 'Пільги для танцюристів на турнірах'}
        </div>
        <div className='advantage-card'>
          {language === 'en'
            ? 'Recommendations for coaches traveling abroad'
            : 'Рекомендації для тренерів, які виїжджають за кордон'}
        </div>
        <div className='advantage-card'>{language === 'en' ? 'Sites for big clubs' : 'Сайти для великих клубів'}</div>
      </div>
    </article>
  );
}
