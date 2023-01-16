import "./Contacts.css";

export default function Contacts() {
  return (
    <article className="contacts">
      <div className="container">
        <h1 className="contacts-title">Контактна інформація</h1>
        <div className="contacts-info">
          <ul className="contacts-block">
            <li>
              <span className="contacts-subtitle">Номера телефонів:</span>
            </li>
            <hr />
            <li className="contact">
              <a href="tel:+380956329575">+38(095)-632-95-75</a>
            </li>
            <li className="contact">
              <a href="tel:+380674428268">+38(067)-442-82-68</a>
            </li>
          </ul>
          <ul className="contacts-block">
            <li>
              <span className="contacts-subtitle">Електронна адреса:</span>
            </li>
            <hr />
            <li className="contact">
              <a href="mailto:sgostu.org@gmail.com">sgostu.org@gmail.com</a>
            </li>
          </ul>
          <ul className="contacts-block">
            <li>
              <span className="contacts-subtitle">Адреса:</span>
            </li>
            <hr />
            <li className="contact">
              <a href="https://goo.gl/maps/odd6byYbjoo79Qpa9" target="_blank">
                м. Київ, Залізничне шосе 3
              </a>
            </li>
          </ul>
          <ul className="contacts-block">
            <li>
              <span className="contacts-subtitle">Банківські реквізити:</span>
            </li>
            <hr />
            <li className="contact">
              <span>Найменування отримувача: ГО СГОСТУ</span>
            </li>
            <li className="contact">
              <span>Код одержувача: 30386538</span>
            </li>
            <li className="contact">
              <span>IBAN: UA543052990000026004046223088</span>
            </li>
            <li className="contact">
              <span>Назва банку: АТ КБ «ПриватБанк»</span>
            </li>
          </ul>
          <ul className="contacts-block">
            <li>
              <span className="contacts-subtitle">Соціальні мережі:</span>
            </li>
            <hr />
            <li className="contact">
              <a href="https://www.facebook.com/SGOSTU" target="_blank">
                Facebook
              </a>
            </li>
            <li className="contact">
              <a href="https://www.instagram.com/sgostuu/" target="_blank">
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
    </article>
  );
}
