import clubPlaceholder from 'materials/icons/clubcard/club-placeholder.jpg';
import { socialsFormatting } from 'helpers/socialsFormatting';
import BackButton from 'common/BackButton/BackButton';
import Facebook from 'materials/icons/Facebook';
import EmailIcon from 'materials/icons/Email';
import PhoneIcon from 'materials/icons/Phone';
import Insta from 'materials/icons/Insta';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import DancerCard from '../../DancerCard/DancerCard';
import Loader from 'components/Loader/Loader';
import CoachCard from '../../CoachCard/CoachCard';
import { useState, useEffect } from 'react';
import './ClubInfo.css';

import * as statusesSlice from 'redux/features/statusesSlice';
import * as dancersSlice from 'redux/features/dancersSlice';
import * as coachesSlice from 'redux/features/coachesSlice';
import * as clubsSlice from 'redux/features/clubsSlice';
import { ErrorMessage } from 'common/ErrorMessage/ErrorMessage';
import { v4 } from 'uuid';

export default function ClubInfo() {
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
  const [clubCoaches, setClubCoaches] = useState([]);
  const [clubDancers, setClubDancers] = useState([]);
  const [info, setInfo] = useState('Танцюристи');
  const [copied, setCopied] = useState(false);
  const [club, setClub] = useState(null);
  const { replace } = useHistory();
  const { clubId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (statuses.length === 0) {
      dispatch(statusesSlice.getStatusesData());
    }
  }, []);

  useEffect(() => {
    if (statuses.length !== 0) {
      if (coaches.length <= 1) {
        dispatch(coachesSlice.getCoachesData(statuses));
      }
      if (dancers.length <= 1) {
        dispatch(dancersSlice.getDancersData(statuses));
      }
      if (dancerClasses.length === 0) {
        dispatch(dancersSlice.getDancerClassesData());
      }
      if (clubs.length === 0) {
        dispatch(clubsSlice.getClubData(clubId));
      }
    }
  }, [statuses]);

  useEffect(() => {
    if (clubs.length > 0) {
      setClub(clubs.find(({ id }) => id === Number(clubId)));
    }
  }, [clubs]);

  useEffect(() => {
    if (club === undefined) {
      replace('/not-found');
      return;
    } else if (club && !club['Approve Club']) {
      replace('/not-found');
      return;
    }

    if (club) {
      const list = document.querySelectorAll('.event-details-list');

      function activeLink() {
        list.forEach((item) => item.classList.remove('active'));
        this.classList.add('active');
        setInfo(this.innerText);
      }

      list.forEach((item) => item.addEventListener('click', activeLink));

      if (dancers.length > 0) {
        setClubDancers(dancers.filter(({ id }) => club['Dancers ok*']?.includes(id)));
      }

      if (coaches.length > 0) {
        setClubCoaches(coaches.filter(({ id }) => club['Coaches ok']?.includes(id)));
      }
    }
  }, [club, coaches, dancers]);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(socialsFormatting('phone', club['Phone Number Club']))
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => console.error('Failed to copy:', err));
  };

  // Fields filling
  function clubWebsite(clubWebsite, fieldType) {
    if (fieldType === 'href') {
      if (clubWebsite.includes('https://') || clubWebsite.includes('http://')) {
        return clubWebsite;
      } else {
        return `https://${clubWebsite}`;
      }
    } else if (fieldType === 'link') {
      let link = club['Website club'].slice(-1) === '/' ? club['Website club'].slice(0, -1) : club['Website club'];
      return link.includes('https://') ? link.slice(8) : link.includes('http://') ? link.slice(7) : link;
    }
  }

  return (
    <section className='club-info'>
      <BackButton />
      {!isStatusesRequestLoading && !isClubsRequestLoading && club ? (
        <>
          <div className='club'>
            <img
              className='club-avatar'
              src={club['Logo Clubs']?.url ? club['Logo Clubs']?.url : clubPlaceholder}
              alt='Логотип клубу'
            />
            <div className='club-inner'>
              {club['Club Name'] && <h2 className='club-name'>{club['Club Name'].split('(')[0].trim()}</h2>}
              <dl className='club-details'>
                <div className='club-dancers-coaches-quantity'>
                  <div className='club-details-wrapper'>
                    <dt className='coaches-quantity club-coaches'>{language === 'en' ? 'Coaches:' : 'Тренерів:'}</dt>
                    <dd>{clubCoaches.length > 0 ? clubCoaches.length : '—'}</dd>
                  </div>
                  <div className='club-details-wrapper'>
                    <dt className='dancers-quantity club-dancers'>{language === 'en' ? 'Dancers:' : 'Танцюристів:'}</dt>
                    <dd>{clubDancers.length > 0 ? clubDancers.length : '—'}</dd>
                  </div>
                </div>
                {club['Address Club'] && (
                  <div className='club-details-wrapper'>
                    <dt className='club-address'>{language === 'en' ? 'Address:' : 'Адреса:'}</dt>
                    <dd>{club['Address Club']}</dd>
                  </div>
                )}
                {(club['SurName of Supervisor'] || club['Name of Supervisor']) && (
                  <div className='club-details-wrapper'>
                    <dt className='club-supervisor'>{language === 'en' ? 'Supervisor:' : 'Керівник:'}</dt>
                    <dd>
                      {club['SurName of Supervisor']} {club['Name of Supervisor']}
                    </dd>
                  </div>
                )}
                {club['Club Name'] && (
                  <div className='club-details-wrapper'>
                    <dt className='club-town'>{language === 'en' ? 'Town:' : 'Місто:'}</dt>
                    <dd>
                      {club['Club Name'].includes('(')
                        ? club['Club Name'].split('(')[1].trim().slice(0, -1)
                        : 'Не вказано'}
                    </dd>
                  </div>
                )}
                {club['Website club'] && (
                  <div className='club-details-wrapper'>
                    <dt className='club-website'>{language === 'en' ? 'Website:' : 'Сайт:'}</dt>
                    <dd>
                      {
                        <a
                          className='linked'
                          href={clubWebsite(club['Website club'], 'href')}
                          target='_blank'
                          rel='noreferrer'
                        >
                          {clubWebsite(club['Website club'], 'link')}
                        </a>
                      }
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
          {(club['Phone Number Club'] || club['E-mail Club'] || club.Facebook || club.Instagram) && (
            <div className='detail-socials-wrapper'>
              {club.Facebook &&
                club.Facebook?.length > 3 &&
                String(socialsFormatting('facebook', club.Facebook)).length > 21 && (
                  <a
                    href={socialsFormatting('facebook', club.Facebook)}
                    target='_blank'
                    rel='noreferrer'
                    className='social-btn facebook'
                  >
                    <Facebook />
                  </a>
                )}
              {club.Instagram &&
                club.Instagram?.length > 3 &&
                String(socialsFormatting('instagram', club.Instagram)).length > 22 && (
                  <a
                    href={socialsFormatting('instagram', club.Instagram)}
                    target='_blank'
                    rel='noreferrer'
                    className='social-btn instagram'
                  >
                    <Insta fill='#fff' />
                  </a>
                )}
              {club['Phone Number Club'] && (
                <button onClick={copyToClipboard} className={`social-btn phone ${copied ? 'copied' : ''}`}>
                  <PhoneIcon />
                </button>
              )}
              {club['E-mail Club'] && (
                <a
                  href={`mailto:${socialsFormatting('email', club['E-mail Club'])}`}
                  target='_blank'
                  rel='noreferrer'
                  className='social-btn email'
                >
                  <EmailIcon />
                </a>
              )}
            </div>
          )}
          {club['Perevagy Club'] && <div className='club-advantages'>{club['Perevagy Club']}</div>}
          <div className='event-detail-info-row'>
            <ul className='event-detail-buttons'>
              <li className='event-details-list active'>{language === 'en' ? 'Dancers' : 'Танцюристи'}</li>
              <li className='event-details-list'>{language === 'en' ? 'Coaches' : 'Тренери'}</li>
              <div className='indicator'></div>
            </ul>
          </div>
          {info === 'Танцюристи' || info === 'Dancers' ? (
            <div className='club-catalog club-dancers'>
              <div className='club-detail-dancers-wrapper'>
                {!isDancersRequestLoading ? (
                  dancers.length > 0 && clubDancers.length > 0 ? (
                    clubDancers.map((dancer) => (
                      <DancerCard
                        screenWidth={window.screen.availWidth}
                        classes={dancerClasses}
                        dancer={dancer}
                        clubs={clubs}
                        key={dancer.id}
                      />
                    ))
                  ) : (
                    <h2 className='no-dancers-searched'>{language === 'en' ? 'No dancers' : 'Танцюристів немає'}</h2>
                  )
                ) : (
                  <Loader className='club-catalog-loader' />
                )}
              </div>
            </div>
          ) : (
            <div className='club-catalog club-dancers'>
              <div className='club-detail-dancers-wrapper'>
                {!isCoachesRequestLoading ? (
                  coaches.length > 0 && clubCoaches.length > 0 ? (
                    clubCoaches.map((coach) => (
                      <CoachCard
                        screenWidth={window.screen.availWidth}
                        dancerClasses={dancerClasses}
                        dancers={dancers}
                        coach={coach}
                        clubs={clubs}
                        key={coach.id}
                      />
                    ))
                  ) : (
                    <h2 className='no-dancers-searched'>{language === 'en' ? 'No coaches' : 'Тренерів немає'}</h2>
                  )
                ) : (
                  <Loader className='club-catalog-loader' />
                )}
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
