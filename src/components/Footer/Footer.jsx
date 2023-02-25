import { LogoSGOSTU } from "../../common/Logos/Logo-SGOSTU";
import Facebook from "../../materials/icons/Facebook";
import Insta from "../../materials/icons/Insta";
import SateLogo from "../../materials/icons/SateLogo";
import "../../materials/icons/SateLogo.css";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-row">
          <div className="footer-mobile-head">
            <LogoSGOSTU />
            <div className="footer-social-mobile">
              <a
                href="https://www.facebook.com/SGOSTU"
                target="_blank"
                rel="noreferrer"
              >
                <Facebook />
              </a>
              <a
                href="https://www.instagram.com/sgostuu/"
                target="_blank"
                rel="noreferrer"
              >
                <Insta />
              </a>
            </div>
          </div>
          <LogoSGOSTU classname="main-logo" />
          <div className="footer-wrapper">
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
              <a
                href="https://goo.gl/maps/odd6byYbjoo79Qpa9"
                target="_blank"
                rel="noreferrer"
              >
                м. Київ, Залізничне шосе 3
              </a>
            </div>
          </div>
          <div className="footer-social">
            <a
              href="https://www.facebook.com/SGOSTU"
              target="_blank"
              rel="noreferrer"
            >
              <Facebook />
            </a>
            <a
              href="https://www.instagram.com/sgostuu/"
              target="_blank"
              rel="noreferrer"
            >
              <Insta />
            </a>
          </div>
        </div>
        <div className="footer-second">
          <hr className="footer-hr" />
          <div className="footer-bottom">
            <span className="copyright">© {year} СГОСТУ</span>
            <SateLogo />
            <a
              href="https://www.instagram.com/sate.team/?theme=dark"
              className="authors"
            >
              By Sate
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
