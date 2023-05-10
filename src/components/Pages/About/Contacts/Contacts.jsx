import "./Contacts.css";

export default function Contacts() {
  const language = window.localStorage.getItem("language");
  return (
    <article className="contacts">
      {window.scrollTo(0, 0)}
      <div className="container">
        <h1 className="contacts-title">
          {" "}
          {language === "en" ? "Contact information" : "Контактна інформація"}
        </h1>
        <div className="contacts-info">
          <ul className="contacts-block">
            <li>
              <span className="contacts-subtitle">
                {language === "en" ? "Phoone numbers" : "Номера телефонів:"}
              </span>
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
              <span className="contacts-subtitle">
                {language === "en" ? "Email addresses" : "Електронна адреса:"}
              </span>
            </li>
            <hr />
            <li className="contact">
              <a href="mailto:sgostu.org@gmail.com">sgostu.org@gmail.com</a>
            </li>
          </ul>
          <ul className="contacts-block">
            <li>
              <span className="contacts-subtitle">
                {language === "en" ? "Address" : "Адреса:"}
              </span>
            </li>
            <hr />
            <li className="contact">
              <a
                href="https://goo.gl/maps/odd6byYbjoo79Qpa9"
                target="_blank"
                rel="noreferrer"
              >
                {language === "en"
                  ? "Kyiv, Zaliznychne shose 3"
                  : "м. Київ, Залізничне шосе 3"}
              </a>
            </li>
          </ul>
          <ul className="contacts-block">
            <li>
              <span className="contacts-subtitle">
                {language === "en" ? "Bank details:" : "Банківські реквізити:"}
              </span>
            </li>
            <hr />
            <li className="contact">
              <span>
                {" "}
                {language === "en"
                  ? "Name of recipient: NGO"
                  : "Найменування отримувача: ГО"}
              </span>
            </li>
            <li className="contact">
              <span>
                {language === "en" ? "Recipient code: " : "Код одержувача: "}
                30386538
              </span>
            </li>
            <li className="contact">
              <span>IBAN: UA543052990000026004046223088</span>
            </li>
            <li className="contact">
              <span>
                {language === "en"
                  ? "Name of the bank: JSC CB «PrivatBank»"
                  : "Назва банку: АТ КБ «ПриватБанк»"}
              </span>
            </li>
          </ul>
          <ul className="contacts-block">
            <li>
              <span className="contacts-subtitle">
                {language === "en" ? "Social networks:" : "Соціальні мережі:"}
              </span>
            </li>
            <hr />
            <li className="contact">
              <a
                href="https://www.facebook.com/SGOSTU"
                target="_blank"
                rel="noreferrer"
              >
                Facebook
              </a>
            </li>
            <li className="contact">
              <a
                href="https://www.instagram.com/sgostuu/"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
            </li>
            <li className="contact">
              <a href="https://t.me/sgostu" target="_blank" rel="noreferrer">
                Telegram
              </a>
            </li>
            <li className="contact">
              <a
                href="https://invite.viber.com/?g2=AQBfM9a%2BIE5ygku6uT40iQZZkC%2BOb12yBt8jIOaeCWQrU5DTvSu7lJYH8IicfSz8"
                target="_blank"
                rel="noreferrer"
              >
                Viber
              </a>
            </li>
          </ul>
        </div>
      </div>
    </article>
  );
}
