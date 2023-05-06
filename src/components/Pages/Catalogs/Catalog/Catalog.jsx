import { dancerClassesSelector } from "../../../../redux/dancerClasses/selectors";
import { judgeClassesSelector } from "../../../../redux/judgeClasses/selectors";
import { statusesSelector } from "../../../../redux/statuses/selectors";
import { coachesSelector } from "../../../../redux/coaches/selectors";
import { dancersSelector } from "../../../../redux/dancers/selectors";
import { regionsSelector } from "../../../../redux/regions/selectors";
import { judgesSelector } from "../../../../redux/judges/selectors";
import { clubsSelector } from "../../../../redux/clubs/selectors";

import { getDancerClasses } from "../../../../redux/dancerClasses/thunk";
import { getJudgeClasses } from "../../../../redux/judgeClasses/thunk";
import { getStatuses } from "../../../../redux/statuses/thunk";
import { getCoaches } from "../../../../redux/coaches/thunk";
import { getDancers } from "../../../../redux/dancers/thunk";
import { getRegions } from "../../../../redux/regions/thunk";
import { getJudges } from "../../../../redux/judges/thunk";
import { getClubs } from "../../../../redux/clubs/thunk";

import BackButton from "../../../../common/BackButton/BackButton";
import SearchBar from "./SearchBar/SearchBar";
import Loader from "../../../Loader/Loader";

import DancerCard from "./Cards/DancerCard/DancerCard";
import CoachCard from "./Cards/CoachCard/CoachCard";
import JudgeCard from "./Cards/JudgeCard/JudgeCard";
import ClubCard from "./Cards/ClubCard/ClubCard";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import "./Catalog.css";

export default function Catalog() {
  const [entitiesOffset, setEntitiesOffset] = useState(24);
  const [catalogTheme, setCatalogTheme] = useState(false);
  const [entitiesList, setEntitiesList] = useState([]);
  const [loading, setLoading] = useState(true);

  const dancers = useSelector(dancersSelector);
  const coaches = useSelector(coachesSelector);
  const judges = useSelector(judgesSelector);
  const clubs = useSelector(clubsSelector);

  const dancerClasses = useSelector(dancerClassesSelector);
  const judgeClasses = useSelector(judgeClassesSelector);
  const statuses = useSelector(statusesSelector);
  const regions = useSelector(regionsSelector);

  const screenWidth = window.screen.availWidth;
  const { catalogs } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (statuses.length === 0) {
      dispatch(getStatuses());
    }
    if (catalogs) {
      setCatalogTheme(true);
    }
    document.addEventListener("scroll", scrollHandler);
    return () => {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  useEffect(() => {
    if (statuses.length !== 0) {
      if (
        catalogs === "dancers" &&
        (dancers.length === 0 ||
          dancerClasses.length === 0 ||
          clubs.length === 0)
      ) {
        dispatch(getDancers(statuses));
        dispatch(getDancerClasses());
        dispatch(getClubs());
      }
      if (
        catalogs === "coaches" &&
        (coaches.length === 0 ||
          dancers.length === 0 ||
          dancerClasses.length === 0 ||
          clubs.length === 0)
      ) {
        dispatch(getCoaches(statuses));
        dispatch(getDancers(statuses));
        dispatch(getDancerClasses());
        dispatch(getClubs());
      }
      if (
        catalogs === "clubs" &&
        (regions.length === 0 ||
          clubs.length === 0 ||
          coaches.length === 0 ||
          dancers.length === 0)
      ) {
        dispatch(getCoaches(statuses));
        dispatch(getDancers(statuses));
        dispatch(getRegions());
        dispatch(getClubs());
      }
      if (
        catalogs === "judges" &&
        (judges.length === 0 || judgeClasses.length === 0)
      ) {
        dispatch(getJudges(statuses));
        dispatch(getJudgeClasses());
      }
    }
  }, [statuses]);

  useEffect(() => {
    if (catalogs === "dancers" && dancers.length !== 0) {
      setEntitiesList(dancers);
    }
    if (catalogs === "coaches" && coaches.length !== 0) {
      setEntitiesList(coaches);
    }
    if (catalogs === "clubs" && clubs.length !== 0) {
      setEntitiesList(clubs);
    }
    if (catalogs === "judges" && judges.length !== 0) {
      setEntitiesList(judges);
    }
  }, [coaches, dancers, judges, clubs]);

  useEffect(() => {
    if (entitiesList.length !== 0) {
      setLoading(false);
    }
  }, [entitiesList]);

  function scrollHandler(e) {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      setEntitiesOffset((entitiesOffset) => entitiesOffset + 24);
    }
  }

  return (
    <>
      {catalogTheme ? (
        <div className="catalog">
          <div className="container">
            <BackButton />
            <h1 className="catalog-title">
              {catalogs === "dancers"
                ? "Танцюристи"
                : catalogs === "clubs"
                ? "Клуби"
                : catalogs === "coaches"
                ? "Тренери"
                : catalogs === "judges" && "Судді"}
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
            />
            <div className="catalog-wrapper">
              {entitiesList.length !== 0 && !loading ? (
                entitiesList
                  .slice(0, entitiesOffset)
                  .map((entity) =>
                    catalogs === "dancers" ? (
                      <DancerCard
                        screenWidth={screenWidth}
                        classes={dancerClasses}
                        key={entity.id}
                        dancer={entity}
                        clubs={clubs}
                      />
                    ) : catalogs === "clubs" ? (
                      <ClubCard
                        screenWidth={screenWidth}
                        dancers={dancers}
                        coaches={coaches}
                        club={entity}
                        key={entity.id}
                      />
                    ) : catalogs === "coaches" ? (
                      <CoachCard
                        screenWidth={screenWidth}
                        dancers={dancers}
                        key={entity.id}
                        coach={entity}
                        clubs={clubs}
                      />
                    ) : (
                      catalogs === "judges" && (
                        <JudgeCard
                          screenWidth={screenWidth}
                          classes={judgeClasses}
                          judge={entity}
                          key={entity.id}
                        />
                      )
                    )
                  )
              ) : !loading && catalogs.length > 0 ? (
                <h2 className="no-dancers-searched">
                  По вашому запиту нічого не знайдено 😐
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
