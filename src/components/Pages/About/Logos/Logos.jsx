import { useEffect } from 'react';
import { logos } from 'constants/logos';
import './Logos.css';

export default function Logos() {
  const language = window.localStorage.getItem('language');

  useEffect(() => {
    const buttons = document.querySelectorAll('.logo-download-link');
    function activeLink() {
      this.classList.add('downloaded');
    }
    buttons.forEach((item) => item.addEventListener('click', activeLink));
  }, []);

  return (
    <article className='logos-catalog'>
      <h1 className='logos-title'>{language === 'en' ? 'Downloadable logos' : 'Логотипи'}</h1>
      <div className='logos-wrapper'>
        {logos.map(({ name, png, svg, pngDark, svgDark }) => (
          <div className='logo-box' key={name}>
            <img src={svg || png} alt={name} className='logo' />
            <div className='logos-download'>
              {png && (
                <a href={png} download className='logo-download-link'>
                  PNG
                  <DownloadBtn />
                </a>
              )}
              {svg && (
                <a href={svg} download className='logo-download-link'>
                  SVG
                  <DownloadBtn />
                </a>
              )}
              {pngDark && (
                <a href={pngDark} download className='logo-download-link'>
                  PNG Dark
                  <DownloadBtn />
                </a>
              )}
              {svgDark && (
                <a href={svgDark} download className='logo-download-link'>
                  SVG Dark
                  <DownloadBtn />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

function DownloadBtn() {
  return (
    <div id='btn-download'>
      <svg width='22px' height='16px' viewBox='0 0 22 16'>
        <path
          d='M2,10 L6,13 L12.8760559,4.5959317 C14.1180021,3.0779974 16.2457925,2.62289624 18,3.5 L18,3.5 C19.8385982,4.4192991 21,6.29848669 21,8.35410197 L21,10 C21,12.7614237 18.7614237,15 16,15 L1,15'
          id='check'
        ></path>
        <polyline points='4.5 8.5 8 11 11.5 8.5' className='svg-out'></polyline>
        <path d='M8,1 L8,11' className='svg-out'></path>
      </svg>
    </div>
  );
}
