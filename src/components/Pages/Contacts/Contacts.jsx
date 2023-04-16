import { useContext } from "react";
import "./Contacts.css";
import { LanguageContext } from "../../../App";

export default function Contacts() {
  const { language } = useContext(LanguageContext);

  return (
    <article className="contacts">
      <div className="container">
        <h1 className="contacts-title">
          {" "}
          {language === "ua" ? "Контактна інформація" : "Contact information"}
        </h1>
        <div className="contacts-info">
          <ul className="contacts-block">
            <li>
              <span className="contacts-subtitle">
                {language === "ua" ? "Номера телефонів:" : "Phoone numbers"}
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
                {language === "ua" ? "Електронна адреса:" : "Email addresses"}
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
                {language === "ua" ? "Адреса:" : "Address"}
              </span>
            </li>
            <hr />
            <li className="contact">
              <a
                href="https://goo.gl/maps/odd6byYbjoo79Qpa9"
                target="_blank"
                rel="noreferrer"
              >
                {language === "ua"
                  ? "м. Київ, Залізничне шосе 3"
                  : "Kyiv, Zaliznychne shose 3"}
              </a>
            </li>
          </ul>
          <ul className="contacts-block">
            <li>
              <span className="contacts-subtitle">
                {language === "ua" ? "Банківські реквізити:" : "Bank details:"}
              </span>
            </li>
            <hr />
            <li className="contact">
              <span>
                {" "}
                {language === "ua"
                  ? "Найменування отримувача: ГО"
                  : "Name of recipient: NGO"}
              </span>
            </li>
            <li className="contact">
              <span>
                {language === "ua" ? "Код одержувача: " : "Recipient code: "}
                30386538
              </span>
            </li>
            <li className="contact">
              <span>IBAN: UA543052990000026004046223088</span>
            </li>
            <li className="contact">
              <span>
                {language === "ua"
                  ? "Назва банку: АТ КБ «ПриватБанк»"
                  : "Name of the bank: JSC CB «PrivatBank»"}
              </span>
            </li>
          </ul>
          <ul className="contacts-block">
            <li>
              <span className="contacts-subtitle">
                {language === "ua" ? "Соціальні мережі:" : "Social networks:"}
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
