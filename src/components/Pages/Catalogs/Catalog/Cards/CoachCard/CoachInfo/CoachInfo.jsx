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
import { Redirect, useHistory, useParams } from "react-router-dom";
import { getClubs } from "../../../../../../../redux/clubs/thunk";
import Button from "../../../../../../../common/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../../../../Loader/Loader";
import { useState, useEffect } from "react";
import "./CoachInfo.css";
import DancerCard from "../../DancerCard/DancerCard";

export default function CoachInfo() {
  const dancerClasses = useSelector(dancerClassesSelector);
  const statuses = useSelector(statusesSelector);
  const coaches = useSelector(coachesSelector);
  const dancers = useSelector(dancersSelector);
  const clubs = useSelector(clubsSelector);

  const [loading, setLoading] = useState(true);
  const [coach, setCoach] = useState({});

  const { coachId } = useParams();
  const { goBack } = useHistory();
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

  console.log(coaches);
  console.log(dancers);

  return (
    <>
      {coach !== {} && coach["Coach Name"] ? (
        <section className="coach-info">
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
                  <dd>{coach["Dancers-"]?.length || "—"}</dd>
                </div>
                <div className="coach-details-wrapper">
                  <dt className="coach-city">Місто:</dt>
                  <dd>
                    {String(
                      clubs
                        .filter((club) => club.id === Number(coach.Club))
                        .map((club) => club.Club_Name)
                    )
                      .split("(")[1]
                      ?.slice(0, -1)}
                  </dd>
                </div>
                <div className="coach-details-wrapper">
                  <dt className="coach-club">Клуб:</dt>
                  <dd>
                    {String(
                      clubs
                        .filter((club) => club.id === Number(coach.Club))
                        .map((club) => club.Club_Name)
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
            {dancers.length !== 0 ? (
              dancers
                .filter((dancer) => coach["Dancers-"].includes(dancer.id))
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
        </section>
      ) : !loading ? (
        <Redirect to="/not-found" />
      ) : (
        <Loader />
      )}
    </>
  );
}
