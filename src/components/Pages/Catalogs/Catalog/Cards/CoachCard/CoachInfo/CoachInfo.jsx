import AvatarPlaceholder from "../../../../../../../common/AvatarPlaceholder/AvatarPlaceholder";
import { dancerClassesSelector } from "../../../../../../../redux/dancerClasses/selectors";
import { getDancerClasses } from "../../../../../../../redux/dancerClasses/thunk";
import { socialsFormatting } from "../../../../../../../hooks/socialsFormatting";
import { statusesSelector } from "../../../../../../../redux/statuses/selectors";
import { dancersSelector } from "../../../../../../../redux/dancers/selectors";
import { coachesSelector } from "../../../../../../../redux/coaches/selectors";
import { clubsSelector } from "../../../../../../../redux/clubs/selectors";
import BackButton from "../../../../../../../common/BackButton/BackButton";
import { getStatuses } from "../../../../../../../redux/statuses/thunk";
import { getDancers } from "../../../../../../../redux/dancers/thunk";
import { getCoaches } from "../../../../../../../redux/coaches/thunk";
import Facebook from "../../../../../../../materials/icons/Facebook";
import { getClubs } from "../../../../../../../redux/clubs/thunk";
import Tiktok from "../../../../../../../materials/icons/Tiktok";
import Insta from "../../../../../../../materials/icons/Insta";
import { Link, Redirect, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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

  const [coachDancers, setCoachDancers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [coach, setCoach] = useState(null);

  const { coachId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
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
      coaches.map((coach) => {
        if (Number(coach.id) === Number(coachId)) {
          setCoach(coach);
        }
      });
    }
  }, [coaches]);

  useEffect(() => {
    if (coach) {
      if (dancers) {
        setCoachDancers(
          dancers.filter((dancer) =>
            coach["My Dancers ok"]?.includes(dancer.id)
          )
        );
      }
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [coach, dancers]);

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
          <div className="coach">
            {coach["Coach Foto"]?.url ? (
              <img
                className="coach-avatar"
                src={coach["Coach Foto"]?.url}
                alt="Аватар"
              />
            ) : (
              <AvatarPlaceholder className="coach-avatar" />
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
                    {coachDancersQuantity() ? coachDancersQuantity() : "—"}
                  </dd>
                </div>
                <div className="coach-details-wrapper">
                  <dt className="coach-city">
                    {language === "en" ? "Town:" : "Місто:"}
                  </dt>
                  <dd>{coachTown() ? coachTown() : "—"}</dd>
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
                    ) : (
                      "—"
                    )}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <div className="coach-socials-wrapper detail-socials-wrapper">
            {coach.Facebook &&
              coach.Facebook?.length > 3 &&
              String(socialsFormatting("facebook", coach.Facebook)).length >
                21 && (
                <a
                  href={socialsFormatting("facebook", coach.Facebook)}
                  target="_blank"
                  rel="noreferrer"
                  className="social-btn facebook"
                >
                  <Facebook />
                </a>
              )}
            {coach.Instagram &&
              coach.Instagram?.length > 3 &&
              String(socialsFormatting("instagram", coach.Instagram)).length >
                22 && (
                <a
                  href={socialsFormatting("instagram", coach.Instagram)}
                  target="_blank"
                  rel="noreferrer"
                  className="social-btn instagram"
                >
                  <Insta fill="#fff" />
                </a>
              )}
            {coach.TikTok &&
              coach.TikTok?.length > 3 &&
              String(socialsFormatting("tiktok", coach.TikTok)).length > 19 && (
                <a
                  href={socialsFormatting("tiktok", coach.TikTok)}
                  target="_blank"
                  rel="noreferrer"
                  className="social-btn tiktok"
                >
                  <Tiktok />
                </a>
              )}
          </div>
          <div className="coach-dancers">
            <span className="coach-dancers-title">
              {language === "en"
                ? "List of coach dancers:"
                : "Список танцюристів тренера:"}
            </span>
            <div className="coach-detail-dancers-wrapper">
              {coachDancers.length !== 0 && !loading ? (
                coachDancers.map((dancer) => (
                  <DancerCard
                    screenWidth={window.screen.availWidth}
                    classes={dancerClasses}
                    dancer={dancer}
                    clubs={clubs}
                    key={dancer.id}
                  />
                ))
              ) : !loading && dancers.length > 0 ? (
                <h2 className="coach-info-no-results no-dancers-searched">
                  {language === "en" ? "No dancers" : "Танцюристів немає"}
                </h2>
              ) : (
                <Loader className="club-catalog-loader" />
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
