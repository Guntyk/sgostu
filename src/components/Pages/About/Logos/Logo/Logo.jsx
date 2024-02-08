export default function Logo({ logo }) {
  return (
    <div className='logo-box'>
      <img src={logo} alt='СГОСТУ' className='logo' />
      <div className='logos-download'>
        <div className='download-line'>
          <a href={logo} className='logo-download-link'>
            PNG
          </a>
          <DownloadBtn />
        </div>
        <div className='download-line'>
          <a href={logo} download className='logo-download-link'>
            SVG
          </a>
          <DownloadBtn />
        </div>
      </div>
    </div>
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
        <polyline points='4.5 8.5 8 11 11.5 8.5' class='svg-out'></polyline>
        <path d='M8,1 L8,11' class='svg-out'></path>
      </svg>
    </div>
  );
}
