import AvatarPlaceholder from "../../../../../../../common/AvatarPlaceholder/AvatarPlaceholder";
import { dancerClassesSelector } from "../../../../../../../redux/dancerClasses/selectors";
import { getDancerClasses } from "../../../../../../../redux/dancerClasses/thunk";
import { statusesSelector } from "../../../../../../../redux/statuses/selectors";
import { dancersSelector } from "../../../../../../../redux/dancers/selectors";
import { coachesSelector } from "../../../../../../../redux/coaches/selectors";
import { clubsSelector } from "../../../../../../../redux/clubs/selectors";
import BackButton from "../../../../../../../common/BackButton/BackButton";
import { getStatuses } from "../../../../../../../redux/statuses/thunk";
import { getDancers } from "../../../../../../../redux/dancers/thunk";
import { getCoaches } from "../../../../../../../redux/coaches/thunk";
import { getClubs } from "../../../../../../../redux/clubs/thunk";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useParams } from "react-router-dom";
import DancerCard from "../../DancerCard/DancerCard";
import Loader from "../../../../../../Loader/Loader";
import { useState, useEffect } from "react";
import "./CoachInfo.css";

export default function CoachInfo() {
  const language = window.localStorage.getItem("language");
  const dancerClasses = useSelector(dancerClassesSelector);
  const statuses = useSelector(statusesSelector);
  const coaches = useSelector(coachesSelector);
  const dancers = useSelector(dancersSelector);
  const clubs = useSelector(clubsSelector);

  const [loading, setLoading] = useState(true);
  const [coach, setCoach] = useState(null);

  const { coachId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (statuses.length === 0) {
      dispatch(getStatuses());
    }
  }, []);

  useEffect(() => {
    if (statuses.length !== 0) {
      if (coaches.length === 0) {
        dispatch(getCoaches(statuses));
      }
      if (dancers.length === 0) {
        dispatch(getDancers(statuses));
      }
      if (dancerClasses.length === 0) {
        dispatch(getDancerClasses());
      }
      if (clubs.length === 0) {
        dispatch(getClubs());
      }
    }
  }, [statuses]);

  useEffect(() => {
    if (coaches.length !== 0) {
      setLoading(false);
      coaches.map((coach) => {
        if (Number(coach.id) === Number(coachId)) {
          setCoach(coach);
        }
      });
    }
  }, [coaches]);

  // Fields filling
  function coachClub() {
    return clubs.filter((club) => club.id === Number(coach["Clubs ok"]))[0];
  }

  function coachTown() {
    return String(
      clubs
        .filter((club) => club.id === Number(coach["Clubs ok"]))
        .map((club) => club["Club Name"])
    )
      .split("(")[1]
      ?.trim()
      ?.slice(0, -1);
  }

  function coachDancersQuantity() {
    return coach["My Dancers ok"]?.filter((dancer) =>
      dancers.map((dancer) => dancer.id).includes(dancer)
    ).length;
  }

  return (
    <>
      {coach ? (
        <section className="coach-info">
          <BackButton />
          {window.scrollTo(0, 0)}
          <div className="coach">
            {coach["Coach Foto"]?.url ? (
              <img
                className="coach-avatar"
                src={coach["Coach Foto"]?.url}
                alt="Аватар"
              />
            ) : (
              <AvatarPlaceholder />
            )}
            <div className="coach-inner">
              <h2 className="coach-name">
                {`${coach["Coach Surname"].trim()} ${coach[
                  "Coach Name"
                ].trim()}`}
              </h2>
              <dl className="coach-details">
                <div className="coach-details-wrapper">
                  <dt className="coach-dancers">
                    {language === "en"
                      ? "Coach dancers:"
                      : "Танцюристів тренера:"}
                  </dt>
                  <dd>
                    {coachDancersQuantity()
                      ? coachDancersQuantity() >= 1
                        ? coachDancersQuantity()
                        : "—"
                      : ""}
                  </dd>
                </div>
                <div className="coach-details-wrapper">
                  <dt className="coach-city">
                    {language === "en" ? "Town:" : "Місто:"}
                  </dt>
                  <dd>{coachTown() ? coachTown() : "Завантаження..."}</dd>
                </div>
                <div className="coach-details-wrapper">
                  <dt className="coach-club">
                    {language === "en" ? "Club:" : "Клуб:"}
                  </dt>
                  <dd>
                    {coachClub() ? (
                      <Link
                        className="linked"
                        to={`/catalogs/clubs/${coachClub().id}`}
                      >
                        {coachClub()["Club Name"].split("(")[0].trim()}
                      </Link>
                    ) : language === "en" ? (
                      "Loading..."
                    ) : (
                      "Завантаження..."
                    )}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <div className="coach-dancers">
            <span className="coach-dancers-title">
              {language === "en"
                ? "List of coach dancers:"
                : "Список танцюристів тренера:"}
            </span>
            <div className="coach-detail-dancers-wrapper">
              {dancers.length !== 0 && coach["My Dancers ok"] ? (
                dancers
                  .filter((dancer) =>
                    coach["My Dancers ok"]?.includes(dancer.id)
                  )
                  .map((dancer) => (
                    <DancerCard
                      screenWidth={window.screen.availWidth}
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
          </div>
        </section>
      ) : !loading ? (
        <Redirect to="/not-found" />
      ) : (
        <Loader />
      )}
    </>
  );
}
