import AvatarPlaceholder from '../../../../../../common/AvatarPlaceholder/AvatarPlaceholder';
import { Link, useHistory } from 'react-router-dom';
import '../../Catalog.css';
import './DancerCard.css';
import './Colors.css';

export default function DancerCard({ dancer, clubs, classes, screenWidth }) {
  const language = window.localStorage.getItem('language');
  const { push } = useHistory();
  const dancerFullName = dancer['D Surname'].trim() + ' ' + dancer['D Name'].trim();
  const dancerClass = classes
    .filter((danceClass) => classes.indexOf(danceClass) + 1 === Number(dancer['Dancer Class'].at(-1)))
    .at(-1)
    ['Class Name'].trim();
  const dancerClub = String(
    clubs.filter((club) => club.id === Number(dancer['Clubs ok*'] || dancer['Club-'])).map((club) => club['Club Name'])
  )
    .split('(')[0]
    .trim();

  function handleClick() {
    if (screenWidth <= 840) {
      push(`/catalogs/dancers/${dancer.id}`);
    }
  }

  return (
    <div className='catalog-card dancer-card' onClick={handleClick}>
      <div className='img-wrapper'>
        {dancer['Dancer_Foto']?.url ? (
          <img className='dancer-img' src={dancer['Dancer_Foto']?.url + '?q=20&auto=format'} alt='Аватар' />
        ) : (
          <AvatarPlaceholder />
        )}
      </div>
      <div className='card-wrapper'>
        <h5 className='card-name'>
          {screenWidth <= 840 ? (
            dancerFullName.length > 21 ? (
              dancerFullName.slice(0, 20) + '...'
            ) : (
              dancerFullName
            )
          ) : (
            <>
              {dancer['D Surname'].trim()}
              <br />
              {dancer['D Name'].trim()}
            </>
          )}
        </h5>
        <span className='card-club'>
          {screenWidth <= 1150 && screenWidth > 840
            ? dancerClub.length > 15
              ? dancerClub.slice(0, 15) + '...'
              : dancerClub
            : dancerClub}
        </span>
      </div>
      <div className='class-birth'>
        <span className={`dancer-class ${dancerClass}`}>
          {dancerClass === 'F (H)'
            ? dancerClass.split('(')[0].trim()
            : screenWidth <= 840 && dancerClass === 'No Class'
            ? '—'
            : dancerClass}
        </span>
      </div>
      <Link className='dancer-details' to={`/catalogs/dancers/${dancer.id}`}>
        {language === 'en' ? 'More' : 'Детальніше'}
      </Link>
    </div>
  );
}
