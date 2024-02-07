import AvatarPlaceholder from 'common/AvatarPlaceholder/AvatarPlaceholder';
import { socialsFormatting } from 'hooks/socialsFormatting';
import BackButton from 'common/BackButton/BackButton';
import Facebook from 'materials/icons/Facebook';
import Tiktok from 'materials/icons/Tiktok';
import Insta from 'materials/icons/Insta';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DancerCard from '../../DancerCard/DancerCard';
import Loader from 'components/Loader/Loader';
import { useState, useEffect } from 'react';
import './CoachInfo.css';

import * as statusesSlice from 'redux/features/statusesSlice';
import * as dancersSlice from 'redux/features/dancersSlice';
import * as coachesSlice from 'redux/features/coachesSlice';
import * as clubsSlice from 'redux/features/clubsSlice';
import { ErrorMessage } from 'common/ErrorMessage/ErrorMessage';
import { v4 } from 'uuid';

export default function CoachInfo() {
  const isStatusesRequestLoading = useSelector((state) => state.statuses.isLoading);
  const statusesRequestErrors = useSelector((state) => state.statuses.errors);
  const statuses = useSelector((state) => state.statuses.statuses);

  const isDancersRequestLoading = useSelector((state) => state.dancers.isLoading);
  const dancersRequestErrors = useSelector((state) => state.dancers.errors);
  const dancerClasses = useSelector((state) => state.dancers.dancerClasses);
  const dancers = useSelector((state) => state.dancers.dancers);

  const isClubsRequestLoading = useSelector((state) => state.clubs.isLoading);
  const clubsRequestErrors = useSelector((state) => state.clubs.errors);
  const clubs = useSelector((state) => state.clubs.clubs);

  const isCoachesRequestLoading = useSelector((state) => state.coaches.isLoading);
  const coachesRequestErrors = useSelector((state) => state.coaches.errors);
  const coaches = useSelector((state) => state.coaches.coaches);

  const language = window.localStorage.getItem('language');
  const [coachDancers, setCoachDancers] = useState([]);
  const [coach, setCoach] = useState(null);
  const { replace } = useHistory();
  const { coachId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (statuses.length === 0) {
      dispatch(statusesSlice.getStatusesData());
    }
  }, []);

  useEffect(() => {
    if (statuses.length !== 0) {
      if (coaches.length === 0) {
        dispatch(coachesSlice.getCoachesData(statuses));
      }
      if (dancers.length === 0) {
        dispatch(dancersSlice.getDancersData(statuses));
      }
      if (dancerClasses.length === 0) {
        dispatch(dancersSlice.getDancerClassesData());
      }
      if (clubs.length === 0) {
        dispatch(clubsSlice.getClubsData());
      }
    }
  }, [statuses]);

  useEffect(() => {
    if (coaches.length !== 0) {
      setCoach(coaches.find(({ id }) => id === Number(coachId)));
    }
  }, [coaches]);

  useEffect(() => {
    console.log(coach);
    if (coach === undefined) {
      replace('/not-found');
    } else {
      dancers.length > 0 && setCoachDancers(dancers.filter(({ id }) => coach['My Dancers ok']?.includes(id)));
    }
  }, [coach, dancers]);

  // Fields filling
  function coachClub() {
    return clubs.find(({ id }) => id === Number(coach['Clubs ok']));
  }

  function coachTown() {
    return String(clubs.filter(({ id }) => id === Number(coach['Clubs ok'])).map((club) => club['Club Name']))
      .split('(')[1]
      ?.trim()
      ?.slice(0, -1);
  }

  function coachDancersQuantity() {
    return coach['My Dancers ok']?.filter((dancer) => dancers.map(({ id }) => id).includes(dancer)).length;
  }

  return (
    <section className='coach-info'>
      <BackButton />
      {!isStatusesRequestLoading && !isCoachesRequestLoading && !isClubsRequestLoading && coach ? (
        <>
          <div className='coach'>
            {coach['Coach Foto']?.url ? (
              <img className='coach-avatar' src={coach['Coach Foto']?.url} alt='Аватар' />
            ) : (
              <AvatarPlaceholder className='coach-avatar' />
            )}
            <div className='coach-inner'>
              <h2 className='coach-name'>{`${coach['Coach Surname'].trim()} ${coach['Coach Name'].trim()}`}</h2>
              <dl className='coach-details'>
                <div className='coach-details-wrapper'>
                  <dt className='coach-dancers'>{language === 'en' ? 'Coach dancers:' : 'Танцюристів тренера:'}</dt>
                  <dd>{coachDancersQuantity() ?? '—'}</dd>
                </div>
                <div className='coach-details-wrapper'>
                  <dt className='coach-city'>{language === 'en' ? 'Town:' : 'Місто:'}</dt>
                  <dd>{coachTown() ?? '—'}</dd>
                </div>
                <div className='coach-details-wrapper'>
                  <dt className='coach-club'>{language === 'en' ? 'Club:' : 'Клуб:'}</dt>
                  <dd>
                    {coachClub() ? (
                      <Link className='linked' to={`/catalogs/clubs/${coachClub().id}`}>
                        {coachClub()['Club Name'].split('(')[0].trim()}
                      </Link>
                    ) : (
                      '—'
                    )}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <div className='coach-socials-wrapper detail-socials-wrapper'>
            {coach.Facebook &&
              coach.Facebook?.length > 3 &&
              String(socialsFormatting('facebook', coach.Facebook)).length > 21 && (
                <a
                  href={socialsFormatting('facebook', coach.Facebook)}
                  target='_blank'
                  rel='noreferrer'
                  className='social-btn facebook'
                >
                  <Facebook />
                </a>
              )}
            {coach.Instagram &&
              coach.Instagram?.length > 3 &&
              String(socialsFormatting('instagram', coach.Instagram)).length > 22 && (
                <a
                  href={socialsFormatting('instagram', coach.Instagram)}
                  target='_blank'
                  rel='noreferrer'
                  className='social-btn instagram'
                >
                  <Insta fill='#fff' />
                </a>
              )}
            {coach.TikTok &&
              coach.TikTok?.length > 3 &&
              String(socialsFormatting('tiktok', coach.TikTok)).length > 19 && (
                <a
                  href={socialsFormatting('tiktok', coach.TikTok)}
                  target='_blank'
                  rel='noreferrer'
                  className='social-btn tiktok'
                >
                  <Tiktok />
                </a>
              )}
          </div>
          {!isDancersRequestLoading && dancers.length > 0 && coachDancers.length > 0 && (
            <div className='coach-dancers'>
              <span className='coach-dancers-title'>
                {language === 'en' ? 'List of coach dancers:' : 'Список танцюристів тренера:'}
              </span>
              <div className='coach-detail-dancers-wrapper'>
                {coachDancers.map((dancer) => (
                  <DancerCard
                    screenWidth={window.screen.availWidth}
                    classes={dancerClasses}
                    dancer={dancer}
                    clubs={clubs}
                    key={dancer.id}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <Loader />
      )}
      {statusesRequestErrors.length > 0 && statusesRequestErrors.map((err) => <ErrorMessage error={err} key={v4()} />)}
      {dancersRequestErrors.length > 0 && dancersRequestErrors.map((err) => <ErrorMessage error={err} key={v4()} />)}
      {clubsRequestErrors.length > 0 && clubsRequestErrors.map((err) => <ErrorMessage error={err} key={v4()} />)}
      {coachesRequestErrors.length > 0 && coachesRequestErrors.map((err) => <ErrorMessage error={err} key={v4()} />)}
    </section>
  );
}
