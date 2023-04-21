import { dancerClassesSelector } from "../../../../redux/dancerClasses/selectors";
import { judgeClassesSelector } from "../../../../redux/judgeClasses/selectors";
import { statusesSelector } from "../../../../redux/statuses/selectors";
import { coachesSelector } from "../../../../redux/coaches/selectors";
import { dancersSelector } from "../../../../redux/dancers/selectors";
import { judgesSelector } from "../../../../redux/judges/selectors";
import { clubsSelector } from "../../../../redux/clubs/selectors";

import { getDancers, getMoreDancers } from "../../../../redux/dancers/thunk";
import { getDancerClasses } from "../../../../redux/dancerClasses/thunk";
import { getJudgeClasses } from "../../../../redux/judgeClasses/thunk";
import { getStatuses } from "../../../../redux/statuses/thunk";
import { getCoaches } from "../../../../redux/coaches/thunk";
import { getJudges } from "../../../../redux/judges/thunk";
import { getClubs } from "../../../../redux/clubs/thunk";

import Button from "../../../../common/Button/Button";
import Input from "../../../../common/Input/Input";
import DancerCard from "./DancerCard/DancerCard";
import CoachCard from "./CoachCard/CoachCard";
import JudgeCard from "./JudgeCard/JudgeCard";
import Loader from "../../../Loader/Loader";
import ClubCard from "./ClubCard/ClubCard";

import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import "./Catalog.css";

export default function Dancers() {
  const [catalogTheme, setCatalogTheme] = useState(false);
  const [dancersOffset, setDancersOffset] = useState(100);

  const dancerClasses = useSelector(dancerClassesSelector);
  const judgeClasses = useSelector(judgeClassesSelector);
  const statuses = useSelector(statusesSelector);
  const coaches = useSelector(coachesSelector);
  const dancers = useSelector(dancersSelector);
  const judges = useSelector(judgesSelector);
  const clubs = useSelector(clubsSelector);
  const { catalogs } = useParams();
  const { goBack } = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener("scroll", throttle(checkPosition, 250));
    window.addEventListener("resize", throttle(checkPosition, 250));
    if (statuses.length === 0) {
      dispatch(getStatuses());
    }
    if (
      catalogs === "dancers" ||
      catalogs === "coaches" ||
      catalogs === "clubs" ||
      catalogs === "judges"
    ) {
      setCatalogTheme(true);
      if (catalogs === "dancers" && dancers.length === 0) {
        dispatch(getDancers());
        dispatch(getDancerClasses());
        dispatch(getClubs());
      }
      if (catalogs === "coaches" && coaches.length === 0) {
        dispatch(getCoaches());
        dispatch(getClubs());
      }
      if (catalogs === "clubs" && clubs.length === 0) {
        dispatch(getClubs());
      }
      if (catalogs === "judges" && judges.length === 0) {
        dispatch(getJudges());
        dispatch(getJudgeClasses());
      }
    }
  }, []);

  function checkPosition() {
    // Нам потребуется знать высоту документа и высоту экрана:
    const height = document.body.offsetHeight;
    const screenHeight = window.innerHeight;

    // Они могут отличаться: если на странице много контента,
    // высота документа будет больше высоты экрана (отсюда и скролл).

    // Записываем, сколько пикселей пользователь уже проскроллил:
    const scrolled = window.scrollY;

    // Обозначим порог, по приближении к которому
    // будем вызывать какое-то действие.
    // В нашем случае — четверть экрана до конца страницы:
    const threshold = height - screenHeight / 4;

    // Отслеживаем, где находится низ экрана относительно страницы:
    const position = scrolled + screenHeight;

    if (position >= threshold) {
      dispatch(getMoreDancers(dancersOffset));
      setDancersOffset(dancersOffset + 100);
    }
  }

  function throttle(callee, timeout) {
    let timer = null;

    return function perform(...args) {
      if (timer) return;

      timer = setTimeout(() => {
        callee(...args);

        clearTimeout(timer);
        timer = null;
      }, timeout);
    };
  }

  function handleMoreDancers(e) {
    e.target.innerText = "Завантаження";
    e.target.disabled = "true";
    dispatch(getMoreDancers(dancersOffset));
    setDancersOffset(dancersOffset + 100);
    setTimeout(() => {
      e.target.innerText = "Більше";
      e.target.disabled = "none";
    }, 4000);
  }

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
            {catalogs === "dancers" && (
              <>
                <h1 className="catalog-title">Танцюристи</h1>
                <Input
                  inputClassName="catalog-search"
                  placeholderText="Пошук"
                />
                <div className="catalog-wrapper">
                  {dancers.length !== 0 ? (
                    dancers
                      .filter((dancer) =>
                        statuses
                          .filter((status) => status.Name !== "Не активний")
                          .map((status) => status.Dancers)
                          .flat()
                          .includes(dancer.id)
                      )
                      .filter((dancer) => dancer.Dancer_Verify)
                      .map((dancer) => (
                        <DancerCard
                          classes={dancerClasses}
                          dancer={dancer}
                          clubs={clubs}
                          key={dancer.id}
                        />
                      ))
                  ) : (
                    <Loader />
                  )}
                </div>
                {dancersOffset <= 500 && dancers.length !== 0 ? (
                  <Button
                    className="catalog-more-btn"
                    buttonText="Більше"
                    onClick={handleMoreDancers}
                  />
                ) : (
                  ""
                )}
              </>
            )}
            {catalogs === "coaches" && (
              <>
                <h1 className="catalog-title">Тренери</h1>
                <Input
                  inputClassName="catalog-search"
                  placeholderText="Пошук"
                />
                <div className="catalog-wrapper">
                  {coaches.length !== 0 ? (
                    coaches
                      .slice(1)
                      .map((coach) => (
                        <CoachCard clubs={clubs} coach={coach} key={coach.id} />
                      ))
                  ) : (
                    <Loader />
                  )}
                </div>
              </>
            )}
            {catalogs === "clubs" && (
              <>
                <h1 className="catalog-title">Клуби</h1>
                <Input
                  inputClassName="catalog-search"
                  placeholderText="Пошук"
                />
                <div className="catalog-wrapper">
                  {clubs.length !== 0 ? (
                    clubs
                      .slice(1)
                      // .filter((club) => club.Approve_Club)
                      .map((club) => <ClubCard club={club} key={club.id} />)
                  ) : (
                    <Loader />
                  )}
                </div>
              </>
            )}
            {catalogs === "judges" && (
              <>
                <h1 className="catalog-title">Судді</h1>
                <Input
                  inputClassName="catalog-search"
                  placeholderText="Пошук"
                />
                <div className="catalog-wrapper">
                  {judges.length !== 0 ? (
                    judges
                      .filter((judge) => judge["Judges Verify"])
                      .map((judge) => (
                        <JudgeCard
                          classes={judgeClasses}
                          judge={judge}
                          key={judge.id}
                        />
                      ))
                  ) : (
                    <Loader />
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}
