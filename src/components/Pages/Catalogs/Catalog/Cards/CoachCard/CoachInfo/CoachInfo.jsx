import AvatarPlaceholder from "../../../../../../../common/AvatarPlaceholder/AvatarPlaceholder";
import { dancerClassesSelector } from "../../../../../../../redux/dancerClasses/selectors";
import { getDancerClasses } from "../../../../../../../redux/dancerClasses/thunk";
import { statusesSelector } from "../../../../../../../redux/statuses/selectors";
import { dancersSelector } from "../../../../../../../redux/dancers/selectors";
import { coachesSelector } from "../../../../../../../redux/coaches/selectors";
import { clubsSelector } from "../../../../../../../redux/clubs/selectors";
import { getStatuses } from "../../../../../../../redux/statuses/thunk";
import { getDancers } from "../../../../../../../redux/dancers/thunk";
import { getCoach } from "../../../../../../../redux/coaches/thunk";
import { getClubs } from "../../../../../../../redux/clubs/thunk";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import Loader from "../../../../../../Loader/Loader";
import { useState, useEffect } from "react";
import "./CoachInfo.css";
import DancerCard from "../../DancerCard/DancerCard";
import BackButton from "../../../../../../../common/BackButton/BackButton";

export default function CoachInfo() {
  const dancerClasses = useSelector(dancerClassesSelector);
  const statuses = useSelector(statusesSelector);
  const coaches = useSelector(coachesSelector);
  const dancers = useSelector(dancersSelector);
  const clubs = useSelector(clubsSelector);

  const [loading, setLoading] = useState(true);
  const [coach, setCoach] = useState({});

  const { coachId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (coaches.length === 0) {
      if (statuses.length === 0) {
        dispatch(getStatuses());
      }
    }
    if (dancers.length === 0) {
      dispatch(getDancers(statuses));
    }
  }, []);

  useEffect(() => {
    if (coaches.length === 0) {
      if (statuses.length !== 0) {
        dispatch(getCoach(coachId));
        dispatch(getDancers(statuses));
        dispatch(getDancerClasses());
        dispatch(getClubs());
      }
    }
  }, [statuses]);

  useEffect(() => {
    if (Array.isArray(coaches) && coaches.length > 1) {
      setCoach(...coaches.filter((coach) => coach.id === Number(coachId)));
      setLoading(false);
    } else if (!Array.isArray(coaches) && coaches["Coach Name"]) {
      setCoach(coaches);
      setLoading(false);
    }
  }, [coaches]);

  return (
    <>
      {coach !== {} && coach["Coach Name"] ? (
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
                  <dt className="coach-dancers">Танцюристів тренера:</dt>
                  <dd>{coach["My Dancers ok"]?.length || "—"}</dd>
                </div>
                <div className="coach-details-wrapper">
                  <dt className="coach-city">Місто:</dt>
                  <dd>
                    {String(
                      clubs
                        .filter((club) => club.id === Number(coach["Clubs ok"]))
                        .map((club) => club["Club Name"])
                    )
                      .split("(")[1]
                      ?.trim()
                      ?.slice(0, -1)}
                  </dd>
                </div>
                <div className="coach-details-wrapper">
                  <dt className="coach-club">Клуб:</dt>
                  <dd>
                    {String(
                      clubs
                        .filter((club) => club.id === Number(coach["Clubs ok"]))
                        .map((club) => club["Club Name"])
                    )
                      .split("(")[0]
                      .trim()}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <div className="coach-dancers">
            <span className="coach-dancers-title">
              Список танцюристів тренера:
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
