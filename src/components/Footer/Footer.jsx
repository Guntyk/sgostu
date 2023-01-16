import { LogoSGOSTU } from "../../common/Logos/Logo-SGOSTU";
import Facebook from "../../materials/icons/Facebook";
import Insta from "../../materials/icons/Insta";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-row">
          <LogoSGOSTU />
          <div className="footer-column">
            <span className="footer-subtitle">Телефон:</span>
            <a className="tel" href="tel:+380674428268">
              +38 (067) 442 82 68
            </a>
            <a className="tel" href="tel:+380956329575">
              +38 (095) 632 95 75
            </a>
          </div>
          <div className="footer-column">
            <span className="footer-subtitle">E-mail:</span>
            <a href="mailto:sgostu.org@gmail.com">sgostu.org@gmail.com</a>
          </div>
          <div className="footer-column">
            <span className="footer-subtitle">Адреса:</span>
            <a href="https://goo.gl/maps/odd6byYbjoo79Qpa9" target="_blank">
              м. Київ, Залізничне шосе 3
            </a>
          </div>
          <div className="footer-social">
            <Facebook />
            <Insta />
          </div>
        </div>
        <div className="footer-row"></div>
      </div>
    </footer>
  );
}
