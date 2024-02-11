import './PartnerCard.css';

export default function PartnerCard({ partner }) {
  const {
    name,
    link,
    logo: {
      data: {
        attributes: { url },
      },
    },
  } = partner;

  return (
    <a href={link} target='_blank' rel='noreferrer' className={`partner-card ${link && 'linked'}`}>
      <img
        className='partner-img'
        src={'https://sgostu-backend.download' + url}
        alt='Логотип спонсора/партнера заходу'
      />
      {name}
    </a>
  );
}
