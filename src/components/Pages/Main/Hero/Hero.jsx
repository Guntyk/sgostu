import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useEffect, useState } from 'react';
import gsap from 'gsap';
import Button from 'common/Button/Button';
import mastercardLogo from 'materials/logos/mastercard.png';
import visaLogo from 'materials/logos/visa.png';
import xmark from 'materials/icons/xmark.svg';
import './Hero.css';
gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const language = window.localStorage.getItem('language');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      // const cursor = document.querySelector(".hero-cursor");

      gsap.to('.title-stroke', {
        y: 0,
        duration: 0.55,
        onComplete: parallaxText(),
      });

      // document.addEventListener("mousemove", (e) => {
      //   const y = e.clientY - 400;
      //   cursor.style.cssText = "left: " + e.clientX + "px; top: " + y + "px; transform: translate(-50%, -50%) scale(1)";
      // });
    }, 500);
  }, []);

  function parallaxText() {
    gsap.to('.title', {
      y: -100,
      ease: 'linear',
      scrollTrigger: {
        trigger: '.about',
        start: 'top bottom',
        end: '+=250px',
        scrub: true,
      },
    });
  }

  return (
    <div className='hero'>
      <h1 className='title'>
        <div>
          <span className='title-stroke'>
            {language === 'en' ? 'Dancesport public organisations' : 'Спілка громадських організацій'}
          </span>
        </div>
        <div>
          <span className='title-stroke'>{language === 'en' ? 'union of Ukraine' : 'спортивного танцю України'}</span>
        </div>
      </h1>
      <Button className='payment-btn' buttonText='Оплатити річний внесок' onClick={() => setIsModalOpen(true)} />
      <FontAwesomeIcon className='hero-arrow-down' icon={faArrowDown} fade />
      <span className='blur'></span>

      <div className={`modal-overlay ${isModalOpen && 'active'}`}>
        <div className='modal-content'>
          <h2>Розмір річного внеску:</h2>
          <ul>
            <li>для танцюристів 950 грн</li>
            <li>для танцюристів початківців 650 грн</li>
            <li>для суддів 1600 грн</li>
            <li>для суддів стажерів 1000 грн</li>
          </ul>
          <p>Членські внески є добровільними і не повертаються платнику за жодних обставин</p>
          <p>
            Переходячи до платежів погоджуюся з умовами{' '}
            <a
              href='https://sgostu-backend.download/uploads/Zagalni_umovi_platformi_DDB_17afde2699.pdf?updated_at=2025-01-27T12:59:11.780Z'
              target='_blank'
            >
              Договору оферти
            </a>{' '}
            та{' '}
            <a
              href='https://sgostu-backend.download/uploads/Politika_konfidenczijnosti_DDB_e990e9a31f.pdf?updated_at=2025-01-27T12:59:20.411Z'
              target='_blank'
            >
              Політикою кофіденційності
            </a>
          </p>
          <h3>Банківські реквізити:</h3>
          <p>Найменування отримувача: ГС СГОСТУ</p>
          <p>Код одержувача: 30386538</p>
          <p>IBAN: UA543052990000026004046223088</p>
          <p>Назва банку: АТ КБ «ПриватБанк»</p>
          <div>
            <img className='payment-logo' src={visaLogo} alt='Логотип Visa' />
            <img className='payment-logo' src={mastercardLogo} alt='Логотип Mastercard' />
          </div>
          Для здійснення оплати:
          <a className='ddb-payment-btn' href='https://app.database.dance' target='_blank'>
            Перейти до бази даних DDB
          </a>
          <button className='close-payment-modal-btn' onClick={() => setIsModalOpen(false)}>
            <img src={xmark} alt='close modal' />
          </button>
        </div>
      </div>
    </div>
  );
}
