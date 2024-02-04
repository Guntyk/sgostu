import { dancerClassesSelector } from '../../../../redux/dancerClasses/selectors';
import { judgeClassesSelector } from '../../../../redux/judgeClasses/selectors';
import { statusesSelector } from '../../../../redux/statuses/selectors';
import { coachesSelector } from '../../../../redux/coaches/selectors';
import { dancersSelector } from '../../../../redux/dancers/selectors';
import { regionsSelector } from '../../../../redux/regions/selectors';
import { judgesSelector } from '../../../../redux/judges/selectors';
import { clubsSelector } from '../../../../redux/clubs/selectors';

import { getDancerClasses } from '../../../../redux/dancerClasses/thunk';
import { getJudgeClasses } from '../../../../redux/judgeClasses/thunk';
import { getStatuses } from '../../../../redux/statuses/thunk';
import { getCoaches } from '../../../../redux/coaches/thunk';
import { getDancers } from '../../../../redux/dancers/thunk';
import { getRegions } from '../../../../redux/regions/thunk';
import { getJudges } from '../../../../redux/judges/thunk';
import { getClubs } from '../../../../redux/clubs/thunk';

import BackButton from '../../../../common/BackButton/BackButton';
import SearchBar from './SearchBar/SearchBar';
import Loader from '../../../Loader/Loader';

import DancerCard from './Cards/DancerCard/DancerCard';
import CoachCard from './Cards/CoachCard/CoachCard';
import JudgeCard from './Cards/JudgeCard/JudgeCard';
import ClubCard from './Cards/ClubCard/ClubCard';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import * as statusesActions from 'redux/features/statusesSlice';
import * as dancersActions from 'redux/features/dancersSlice';

import './Catalog.css';

export default function Catalog() {
  const isDancersRequestLoading = useSelector((state) => state.dancers.isLoading);
  const dancersRequestResponse = useSelector((state) => state.dancers.errors);
  const allDancers = useSelector((state) => state.dancers.dancersList);
  const dancerClasses = useSelector((state) => state.dancers.dancerClassesList);

  const isStatusesRequestLoading = useSelector((state) => state.statuses.isLoading);
  const statusesRequestResponse = useSelector((state) => state.statuses.errors);
  const statuses = useSelector((state) => state.statuses.statusesList);

  const [dancers, setDancers] = useState([]);

  useEffect(() => {
    if (allDancers.length > 0 && statuses.length !== 0) {
      setDancers(
        allDancers.filter((dancer) =>
          statuses
            .filter((status) => status.Name !== 'Не активний')
            .map((status) => status.Dancers)
            .flat()
            .includes(dancer.id),
        ),
      );
      console.log(allDancers);
      allDancers.filter(({ id }) => {
        console.log(id);
        console.log(
          statuses
            .filter(({ Name }) => Name !== 'Не активний')
            .map(({ Dancers }) => Dancers)
            .flat()
            // .includes(id),
        );
      });
    }
  }, [allDancers]);

  const language = window.localStorage.getItem('language');
  const [entitiesOffset, setEntitiesOffset] = useState(24);
  const [catalogTheme, setCatalogTheme] = useState(false);
  const [entitiesList, setEntitiesList] = useState([]);
  const [loading, setLoading] = useState(true);

  const coaches = useSelector(coachesSelector);
  const judges = useSelector(judgesSelector);
  const clubs = useSelector(clubsSelector);

  const judgeClasses = useSelector(judgeClassesSelector);
  const regions = useSelector(regionsSelector);

  const screenWidth = window.screen.availWidth;
  const { catalogs } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (statuses.length === 0) {
      dispatch(statusesActions.getStatusesData());
    }
    if (catalogs) {
      setCatalogTheme(true);
    }
    document.addEventListener('scroll', scrollHandler);
    return () => {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  useEffect(() => {
    if (statuses.length !== 0) {
      if (catalogs === 'dancers' && (allDancers.length === 0 || dancerClasses.length === 0 || clubs.length === 0)) {
        dispatch(dancersActions.getDancersData());
        dispatch(dancersActions.getDancerClassesData());
        dispatch(getClubs());
      }
      if (catalogs === 'coaches' && (coaches.length === 0 || dancers.length === 0 || dancerClasses.length === 0 || clubs.length === 0)) {
        dispatch(getCoaches(statuses));
        dispatch(getDancers(statuses));
        dispatch(getDancerClasses());
        dispatch(getClubs());
      }
      if (catalogs === 'clubs' && (regions.length === 0 || clubs.length === 0 || coaches.length === 0 || dancers.length === 0)) {
        dispatch(getCoaches(statuses));
        dispatch(getDancers(statuses));
        dispatch(getRegions());
        dispatch(getClubs());
      }
      if (catalogs === 'judges' && (judges.length === 0 || judgeClasses.length === 0)) {
        dispatch(getJudges(statuses));
        dispatch(getJudgeClasses());
      }
    }
  }, [statuses]);

  useEffect(() => {
    if (catalogs === 'dancers' && dancers.length !== 0) {
      setEntitiesList(dancers);
    }
    if (catalogs === 'coaches' && coaches.length !== 0) {
      setEntitiesList(coaches);
    }
    if (catalogs === 'clubs' && clubs.length !== 0) {
      setEntitiesList(clubs);
    }
    if (catalogs === 'judges' && judges.length !== 0) {
      setEntitiesList(judges);
    }
  }, [coaches, dancers, judges, clubs]);

  useEffect(() => {
    if (entitiesList.length !== 0) {
      setLoading(false);
    }
  }, [entitiesList]);

  useEffect(() => {
    if (dancers.length === 0) {
      dispatch(dancersActions.getDancersData());
    }
  }, []);

  useEffect(() => {
    console.log(statuses);
  }, [statuses]);
  useEffect(() => {
    console.log(dancers);
  }, [dancers]);
  useEffect(() => {
    console.log(dancerClasses);
  }, [dancerClasses]);

  function scrollHandler(e) {
    if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
      setEntitiesOffset((entitiesOffset) => entitiesOffset + 24);
    }
  }

  return (
    <>
      {catalogTheme ? (
        <div className='catalog'>
          <div className='container'>
            <BackButton />
            <h1 className='catalog-title'>
              {catalogs === 'dancers'
                ? language === 'en'
                  ? 'Dancers'
                  : 'Танцюристи'
                : catalogs === 'clubs'
                ? language === 'en'
                  ? 'Clubs'
                  : 'Клуби'
                : catalogs === 'coaches'
                ? language === 'en'
                  ? 'Coaches'
                  : 'Тренери'
                : catalogs === 'judges' && language === 'en'
                ? 'Judges'
                : 'Судді'}
            </h1>
            {/* <SearchBar
              setEntitiesList={setEntitiesList}
              dancerClasses={dancerClasses}
              entitiesList={entitiesList}
              judgeClasses={judgeClasses}
              catalogs={catalogs}
              statuses={statuses}
              coaches={coaches}
              dancers={dancers}
              regions={regions}
              loading={loading}
              judges={judges}
              clubs={clubs}
            /> */}
            <div className='catalog-wrapper'>
              {entitiesList.length !== 0 && !loading ? (
                entitiesList.slice(0, entitiesOffset).map((entity) => {
                  switch (catalogs) {
                    case 'dancers':
                      return <DancerCard screenWidth={screenWidth} classes={dancerClasses} key={entity.id} dancer={entity} clubs={clubs} />;
                    case 'clubs':
                      return <ClubCard screenWidth={screenWidth} dancers={dancers} coaches={coaches} club={entity} key={entity.id} />;
                    case 'coaches':
                      return <CoachCard screenWidth={screenWidth} dancers={dancers} key={entity.id} coach={entity} clubs={clubs} />;
                    case 'judges':
                      return <JudgeCard screenWidth={screenWidth} classes={judgeClasses} judge={entity} key={entity.id} />;
                    default:
                      break;
                  }
                })
              ) : !loading && catalogs.length > 0 ? (
                <h2 className='no-dancers-searched'>
                  {language === 'en' ? 'Nothing was found for your request 😐' : 'По вашому запиту нічого не знайдено 😐'}
                </h2>
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}
