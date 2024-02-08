import BackButton from 'common/BackButton/BackButton';
import SearchBar from './SearchBar/SearchBar';
import Loader from 'components/Loader/Loader';

import DancerCard from './Cards/DancerCard/DancerCard';
import CoachCard from './Cards/CoachCard/CoachCard';
import JudgeCard from './Cards/JudgeCard/JudgeCard';
import ClubCard from './Cards/ClubCard/ClubCard';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import * as statusesSlice from 'redux/features/statusesSlice';
import * as coachesSlice from 'redux/features/coachesSlice';
import * as dancersSlice from 'redux/features/dancersSlice';
import * as judgesSlice from 'redux/features/judgesSlice';
import * as clubsSlice from 'redux/features/clubsSlice';
import { ErrorMessage } from 'common/ErrorMessage/ErrorMessage';
import { v4 } from 'uuid';

import './Catalog.css';

export default function Catalog() {
  const isStatusesRequestLoading = useSelector((state) => state.statuses.isLoading);
  const statusesRequestErrors = useSelector((state) => state.statuses.errors);
  const statuses = useSelector((state) => state.statuses.statuses);

  const isClubsRequestLoading = useSelector((state) => state.clubs.isLoading);
  const clubsRequestErrors = useSelector((state) => state.clubs.errors);
  const regions = useSelector((state) => state.clubs.regions);
  const clubs = useSelector((state) => state.clubs.clubs);

  const isCoachesRequestLoading = useSelector((state) => state.coaches.isLoading);
  const coachesRequestErrors = useSelector((state) => state.coaches.errors);
  const coaches = useSelector((state) => state.coaches.coaches);

  const isDancersRequestLoading = useSelector((state) => state.dancers.isLoading);
  const dancersRequestErrors = useSelector((state) => state.dancers.errors);
  const dancerClasses = useSelector((state) => state.dancers.dancerClasses);
  const dancers = useSelector((state) => state.dancers.dancers);

  const isJudgesRequestLoading = useSelector((state) => state.judges.isLoading);
  const judgesRequestErrors = useSelector((state) => state.judges.errors);
  const judgeClasses = useSelector((state) => state.judges.judgeClasses);
  const judges = useSelector((state) => state.judges.judges);

  const language = window.localStorage.getItem('language');
  const [entitiesOffset, setEntitiesOffset] = useState(24);
  const [entitiesList, setEntitiesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(false);

  const screenWidth = window.screen.availWidth;
  const { catalogs } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (statuses.length === 0) {
      dispatch(statusesSlice.getStatusesData());
    }
    document.addEventListener('scroll', scrollHandler);
    return () => {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  useEffect(() => {
    setLoading(
      isStatusesRequestLoading ||
        isClubsRequestLoading ||
        isCoachesRequestLoading ||
        isDancersRequestLoading ||
        isJudgesRequestLoading
    );
  }, [
    isStatusesRequestLoading,
    isClubsRequestLoading,
    isCoachesRequestLoading,
    isDancersRequestLoading,
    isJudgesRequestLoading,
  ]);

  useEffect(() => {
    if (statuses.length === 0) {
      return;
    }

    if (catalogs === 'dancers' || catalogs === 'coaches' || catalogs === 'clubs') {
      if (dancers.length <= 1) {
        dispatch(dancersSlice.getDancersData(statuses));
      }
      if (dancerClasses.length === 0) {
        dispatch(dancersSlice.getDancerClassesData());
      }
      if (clubs.length <= 1) {
        dispatch(clubsSlice.getClubsData(statuses));
      }
    }

    if (catalogs === 'coaches' || catalogs === 'clubs') {
      if (coaches.length <= 1) {
        dispatch(coachesSlice.getCoachesData(statuses));
      }
    }

    if (catalogs === 'clubs') {
      if (regions.length === 0) {
        dispatch(clubsSlice.getRegionsData(statuses));
      }
    }

    if (catalogs === 'judges') {
      if (judges.length <= 1) {
        dispatch(judgesSlice.getJudgesData(statuses));
      }
      if (judgeClasses.length === 0) {
        dispatch(judgesSlice.getJudgeClassesData());
      }
    }
  }, [statuses]);

  function scrollHandler(e) {
    if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
      setEntitiesOffset((entitiesOffset) => entitiesOffset + 24);
    }
  }

  useEffect(() => {
    switch (catalogs) {
      case 'dancers':
        if (dancers.length > 0) {
          setEntitiesList(dancers);
        }
        break;
      case 'clubs':
        if (clubs.length > 0) {
          setEntitiesList(clubs);
        }
        break;
      case 'coaches':
        if (coaches.length > 0) {
          setEntitiesList(coaches);
        }
        break;
      case 'judges':
        if (judges.length > 0) {
          setEntitiesList(judges);
        }
        break;
      default:
        break;
    }
  }, [dancers, judges, clubs, coaches]);

  return (
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
        <SearchBar
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
          search={search}
          setSearch={setSearch}
        />
        <div className='catalog-wrapper'>
          {!loading ? (
            entitiesList.length > 0 ? (
              entitiesList
                .slice(0, entitiesOffset)
                .map((entity) =>
                  catalogs === 'dancers' ? (
                    <DancerCard
                      screenWidth={screenWidth}
                      classes={dancerClasses}
                      key={entity.id}
                      dancer={entity}
                      clubs={clubs}
                    />
                  ) : catalogs === 'clubs' ? (
                    <ClubCard
                      screenWidth={screenWidth}
                      dancers={dancers}
                      coaches={coaches}
                      club={entity}
                      key={entity.id}
                    />
                  ) : catalogs === 'coaches' ? (
                    <CoachCard
                      screenWidth={screenWidth}
                      dancers={dancers}
                      key={entity.id}
                      coach={entity}
                      clubs={clubs}
                    />
                  ) : (
                    catalogs === 'judges' && (
                      <JudgeCard screenWidth={screenWidth} classes={judgeClasses} judge={entity} key={entity.id} />
                    )
                  )
                )
            ) : (
              search && (
                <h2 className='no-dancers-searched'>
                  {language === 'en'
                    ? 'Nothing was found for your request 😐'
                    : 'По вашому запиту нічого не знайдено 😐'}
                </h2>
              )
            )
          ) : (
            <Loader />
          )}
        </div>
        {statusesRequestErrors.length > 0 &&
          statusesRequestErrors.map((err) => <ErrorMessage error={err} key={v4()} />)}
        {clubsRequestErrors.length > 0 && clubsRequestErrors.map((err) => <ErrorMessage error={err} key={v4()} />)}
        {coachesRequestErrors.length > 0 && coachesRequestErrors.map((err) => <ErrorMessage error={err} key={v4()} />)}
        {dancersRequestErrors.length > 0 && dancersRequestErrors.map((err) => <ErrorMessage error={err} key={v4()} />)}
        {judgesRequestErrors.length > 0 && judgesRequestErrors.map((err) => <ErrorMessage error={err} key={v4()} />)}
      </div>
    </div>
  );
}
