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

import DancerCard from "./DancersCatalog/DancerCard/DancerCard";
import CoachCard from "./CoachesCatalog/CoachCard/CoachCard";
import JudgeCard from "./JudgesCatalog/JudgeCard/JudgeCard";
import ClubCard from "./ClubsCatalog/ClubCard/ClubCard";

import Button from "../../../../common/Button/Button";
import SearchBar from "./SearchBar/SearchBar";
import Loader from "../../../Loader/Loader";

import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import "./Catalog.css";

export default function Dancers() {
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
  const { goBack } = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (statuses.length === 0) {
      dispatch(getStatuses());
    }
    if (catalogs) {
      setCatalogTheme(true);
    }
  }, []);

  useEffect(() => {
    if (statuses.length !== 0) {
      if (
        (catalogs === "dancers" && dancers.length === 0) ||
        !Array.isArray(dancers)
      ) {
        dispatch(getDancers(statuses));
        dispatch(getDancerClasses());
        dispatch(getClubs());
      }
      if (catalogs === "coaches" && coaches.length === 0) {
        dispatch(getCoaches(statuses));
        dispatch(getClubs());
      }
      if (catalogs === "clubs" && clubs.length === 0) {
        dispatch(getClubs());
        dispatch(getRegions());
      }
      if (catalogs === "judges" && judges.length === 0) {
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
    if (entitiesList.length !== 0) {
      setLoading(false);
    }
    console.log(entitiesList);
  }, [coaches, dancers, judges, clubs]);

  return (
    <>
      {catalogTheme ? (
        <div className="catalog">
          <div className="container">
            <Button
              buttonText={
                <svg
                  cursor="pointer"
                  width="30px"
                  height="30px"
                  fill="#000"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M7 239c-9.4 9.4-9.4 24.6 0 33.9L143 409c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-95-95L488 280c13.3 0 24-10.7 24-24s-10.7-24-24-24L81.9 232l95-95c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L7 239z" />
                </svg>
              }
              className="back-link"
              onClick={goBack}
            />
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
              catalogs={catalogs}
              regions={regions}
              dancers={dancers}
              clubs={clubs}
              coaches={coaches}
              judges={judges}
              statuses={statuses}
              dancerClasses={dancerClasses}
              judgeClasses={judgeClasses}
            />
            <div className="catalog-wrapper">
              {entitiesList.length !== 0 ? (
                entitiesList.map((entity) =>
                  catalogs === "dancers" ? (
                    <DancerCard
                      screenWidth={screenWidth}
                      classes={dancerClasses}
                      key={entity.id}
                      dancer={entity}
                      clubs={clubs}
                    />
                  ) : catalogs === "clubs" ? (
                    <ClubCard key={entity.id} club={entity} />
                  ) : catalogs === "coaches" ? (
                    <CoachCard clubs={clubs} coach={entity} key={entity.id} />
                  ) : catalogs === "judges" ? (
                    <JudgeCard
                      classes={judgeClasses}
                      judge={entity}
                      key={entity.id}
                    />
                  ) : (
                    <h2>Сталася помилка</h2>
                  )
                )
              ) : !loading && entitiesList.length === 0 ? (
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
