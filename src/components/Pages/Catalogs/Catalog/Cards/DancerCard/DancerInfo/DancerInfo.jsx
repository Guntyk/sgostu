import AvatarPlaceholder from 'common/AvatarPlaceholder/AvatarPlaceholder';
import { socialsFormatting } from 'helpers/socialsFormatting';
import BackButton from 'common/BackButton/BackButton';
import Facebook from 'materials/icons/Facebook';
import Tiktok from 'materials/icons/Tiktok';
import Insta from 'materials/icons/Insta';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'components/Loader/Loader';
import { useState, useEffect } from 'react';
import './DancerInfo.css';
import '../Colors.css';

import * as statusesSlice from 'redux/features/statusesSlice';
import * as dancersSlice from 'redux/features/dancersSlice';
import * as clubsSlice from 'redux/features/clubsSlice';
import { ErrorMessage } from 'common/ErrorMessage/ErrorMessage';
import { v4 } from 'uuid';

export default function DancerInfo() {
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

  const language = window.localStorage.getItem('language');
  const [dancer, setDancer] = useState(null);
  const { replace } = useHistory();
  const { dancerId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (statuses.length === 0) {
      dispatch(statusesSlice.getStatusesData());
    }
  }, []);

  useEffect(() => {
    if (statuses.length !== 0) {
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
    if (dancers.length !== 0) {
      setDancer(dancers.find(({ id }) => id === Number(dancerId)));
    }
  }, [dancers]);

  useEffect(() => {
    if (dancer === undefined) {
      replace('/not-found');
    }
  }, [dancer]);

  // Fields filling
  function dancerClub() {
    return clubs.find((club) => club.id === Number(dancer['Clubs ok']));
  }

  function dancerClass(coefficient) {
    const dancerClass = dancerClasses
      .filter(
        (danceClass) =>
          (coefficient === 'current' ? dancerClasses.indexOf(danceClass) + 1 : dancerClasses.indexOf(danceClass)) ===
          (coefficient === 'prev' ? Number(dancer['Dancer Class'].at(-1) - 2) : Number(dancer['Dancer Class'].at(-1)))
      )
      .at(-1);
    return dancerClass !== undefined && dancerClass['Class Name']?.trim();
  }

  return (
    <section className='dancer-info'>
      <BackButton className='detail-catalog-info-button' />
      {!isStatusesRequestLoading && !isDancersRequestLoading && !isClubsRequestLoading && dancer ? (
        <>
          <div className='dancer'>
            {dancer.Dancer_Foto?.url ? (
              <img className='dancer-avatar' src={dancer.Dancer_Foto?.url} alt='Аватар' />
            ) : (
              <AvatarPlaceholder />
            )}
            <div className='dancer-inner'>
              <h2 className='dancer-name'>
                {dancer['D Surname'].trim()} {dancer['D Name'].trim()}
              </h2>
              <dl className='dancer-details'>
                <div className='dancer-details-wrapper'>
                  <dt className='dancer-club'>{language === 'en' ? 'Club:' : 'Клуб:'}</dt>
                  <dd className={`dancer-detail-club-name ${dancerClub() ? 'linked' : ''}`}>
                    {dancerClub() ? (
                      <Link to={`/catalogs/clubs/${dancerClub().id}`}>
                        {dancerClub()['Club Name'].split('(')[0].trim()}
                      </Link>
                    ) : language === 'en' ? (
                      'Not specified'
                    ) : (
                      'Не вказано'
                    )}
                  </dd>
                </div>
                <div className='dancer-details-wrapper'>
                  <dt className='dancer-status'>{language === 'en' ? 'Status:' : 'Статус:'}</dt>
                  <dd className='dancer-detail-status-name'>
                    {statuses.filter((status) => status.id === dancer['Status'][0])[0]['Name']}
                  </dd>
                </div>
              </dl>
              {dancerClasses.length !== 0 ? (
                <div className='dancer-detail-class-wrapper'>
                  <span
                    className={`dancer-detail-class dancer-detail-prev-class ${
                      dancerClass('current') !== 'No Class' && dancerClass('prev')
                    }`}
                  >
                    {dancerClass('current') === ('No Class' || 'Debut') ? '' : dancerClass('prev')}
                  </span>
                  <span className={`dancer-detail-class dancer-detail-current-class ${dancerClass('current')}`}>
                    {dancerClass('current')}
                  </span>
                  <span className={`dancer-detail-class dancer-detail-next-class ${dancerClass('next')}`}>
                    {dancerClass('current') === ('No Class' || 'Pro') ? '' : dancerClass('next')}
                  </span>
                </div>
              ) : language === 'en' ? (
                'Loading...'
              ) : (
                'Завантаження...'
              )}
            </div>
          </div>
          <div className='detail-socials-wrapper'>
            {dancer.Facebook &&
              dancer.Facebook?.length > 3 &&
              String(socialsFormatting('facebook', dancer.Facebook)).length > 21 && (
                <a
                  href={socialsFormatting('facebook', dancer.Facebook)}
                  target='_blank'
                  rel='noreferrer'
                  className='social-btn facebook'
                >
                  <Facebook />
                </a>
              )}
            {dancer.Instagram &&
              dancer.Instagram?.length > 3 &&
              String(socialsFormatting('instagram', dancer.Instagram)).length > 22 && (
                <a
                  href={socialsFormatting('instagram', dancer.Instagram)}
                  target='_blank'
                  rel='noreferrer'
                  className='social-btn instagram'
                >
                  <Insta fill='#fff' />
                </a>
              )}
            {dancer.TikTok &&
              dancer.TikTok?.length > 3 &&
              String(socialsFormatting('tiktok', dancer.TikTok)).length > 19 && (
                <a
                  href={socialsFormatting('tiktok', dancer.TikTok)}
                  target='_blank'
                  rel='noreferrer'
                  className='social-btn tiktok'
                >
                  <Tiktok />
                </a>
              )}
          </div>
        </>
      ) : (
        <Loader />
      )}
      {statusesRequestErrors.length > 0 && statusesRequestErrors.map((err) => <ErrorMessage error={err} key={v4()} />)}
      {dancersRequestErrors.length > 0 && dancersRequestErrors.map((err) => <ErrorMessage error={err} key={v4()} />)}
      {clubsRequestErrors.length > 0 && clubsRequestErrors.map((err) => <ErrorMessage error={err} key={v4()} />)}
    </section>
  );
}
