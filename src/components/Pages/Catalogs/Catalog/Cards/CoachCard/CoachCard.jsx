import AvatarPlaceholder from 'common/AvatarPlaceholder/AvatarPlaceholder';
import { Link, useHistory } from 'react-router-dom';
import './CoachCard.css';
import '../../Catalog.css';

export default function CoachCard({ dancers, coach, clubs, screenWidth }) {
  const language = window.localStorage.getItem('language');
  const { push } = useHistory();
  const coachFullName = coach['Coach Surname'].trim() + ' ' + coach['Coach Name'].trim();

  function handleClick() {
    if (screenWidth <= 840) {
      push(`/catalogs/coaches/${coach.id}`);
    }
  }

  return (
    <div className='catalog-card coach-card' onClick={handleClick}>
      <div className='img-wrapper'>
        {coach['Coach Foto']?.url ? <img src={coach['Coach Foto']?.url} alt='Аватар' /> : <AvatarPlaceholder />}
      </div>
      <div className='coach-name-club'>
        <h5 className='card-name'>
          {screenWidth <= 840 ? (
            coachFullName.length > 21 ? (
              coachFullName.slice(0, 20) + '...'
            ) : (
              coachFullName
            )
          ) : (
            <>
              {coach['Coach Name'].trim()}
              <br />
              {coach['Coach Surname'].trim()}
            </>
          )}
        </h5>
        <span className='coach-club'>
          {String(clubs.filter((club) => club.id === Number(coach.Club)).map((club) => club['Club Name']))
            .split('(')[0]
            .trim()}
        </span>
      </div>
      <div className='card-stats'>
        <span className='dancers-quantity'>
          {coach['My Dancers ok']?.filter((dancer) => dancers.map((dancer) => dancer.id).includes(dancer)).length ||
            '—'}
        </span>
      </div>
      <Link className='card-details' to={`/catalogs/coaches/${coach.id}`}>
        {language === 'en' ? 'More' : 'Детальніше'}
      </Link>
    </div>
  );
}
