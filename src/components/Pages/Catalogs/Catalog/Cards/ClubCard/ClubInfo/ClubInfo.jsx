import AvatarPlaceholder from "../../../../../../../common/AvatarPlaceholder/AvatarPlaceholder";
import { dancerClassesSelector } from "../../../../../../../redux/dancerClasses/selectors";
import { getDancerClasses } from "../../../../../../../redux/dancerClasses/thunk";
import { statusesSelector } from "../../../../../../../redux/statuses/selectors";
import { coachesSelector } from "../../../../../../../redux/coaches/selectors";
import { dancersSelector } from "../../../../../../../redux/dancers/selectors";
import { regionsSelector } from "../../../../../../../redux/regions/selectors";
import { clubsSelector } from "../../../../../../../redux/clubs/selectors";
import BackButton from "../../../../../../../common/BackButton/BackButton";
import { getStatuses } from "../../../../../../../redux/statuses/thunk";
import { getCoaches } from "../../../../../../../redux/coaches/thunk";
import { getDancers } from "../../../../../../../redux/dancers/thunk";
import { getRegions } from "../../../../../../../redux/regions/thunk";
import { getClubs } from "../../../../../../../redux/clubs/thunk";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import DancerCard from "../../DancerCard/DancerCard";
import Loader from "../../../../../../Loader/Loader";
import CoachCard from "../../CoachCard/CoachCard";
import { useState, useEffect } from "react";
import "./ClubInfo.css";

export default function ClubInfo() {
  const dancerClasses = useSelector(dancerClassesSelector);
  const statuses = useSelector(statusesSelector);
  const coaches = useSelector(coachesSelector);
  const dancers = useSelector(dancersSelector);
  const regions = useSelector(regionsSelector);
  const clubs = useSelector(clubsSelector);

  const [loading, setLoading] = useState(true);
  const [club, setClub] = useState(null);

  const { clubId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (statuses.length === 0) {
      dispatch(getStatuses());
    }
  }, []);

  useEffect(() => {
    if (statuses.length !== 0) {
      if (clubs.length === 0) {
        dispatch(getClubs());
      }
      if (regions.length === 0) {
        dispatch(getRegions());
      }
      if (coaches.length === 0) {
        dispatch(getCoaches(statuses));
      }
      if (dancers.length === 0) {
        dispatch(getDancers(statuses));
      }
      if (dancerClasses.length === 0) {
        dispatch(getDancerClasses());
      }
    }
  }, [statuses]);

  useEffect(() => {
    if (clubs.length !== 0) {
      setLoading(false);
      clubs.map((club) => {
        if (Number(club.id) === Number(clubId)) {
          setClub(club);
        }
      });
    }
  }, [clubs]);

  // Fields filling
  function clubDancers() {
    return club["Dancers ok*"]?.filter((dancer) =>
      dancers.map((dancer) => dancer.id).includes(dancer)
    );
  }
  function clubCoaches() {
    return club["Coaches ok"]?.filter((coach) =>
      coaches.map((coach) => coach.id).includes(coach)
    );
  }

  function clubCity() {
    return club["Club Name"].split("(")[1].trim().slice(0, -1);
  }

  function clubRegion() {
    return regions.filter(
      (region) => region.id === Number(club["Region Clubs"][0])
    )[0]["Region Name"];
  }

  function clubSupervisor() {
    const name = `${club["SurName of Supervisor"]} ${club["Name of Supervisor"]}`;
    return name;
  }

  function clubWebsite() {
    return club["Website club"];
  }

  function clubAddress() {
    return club["Address Club"];
  }

  return (
    <>
      {club ? (
        <section className="club-info">
          <BackButton />
          {window.scrollTo(0, 0)}
          <div className="club">
            {club["Logo Clubs"]?.url ? (
              <img
                className="club-avatar"
                src={club["Logo Clubs"]?.url}
                alt="Аватар"
              />
            ) : (
              <AvatarPlaceholder />
            )}
            <div className="club-inner">
              <h2 className="club-name">
                {club["Club Name"].split("(")[0].trim()}
              </h2>
              <dl className="club-details">
                <div className="club-dancers-coaches-quantity">
                  <div className="club-details-wrapper">
                    <dt className="coaches-quantity club-coaches">Тренерів:</dt>
                    <dd>{clubCoaches() ? clubCoaches().length : "—"}</dd>
                  </div>
                  <div className="club-details-wrapper">
                    <dt className="dancers-quantity club-dancers">
                      Танцюристів:
                    </dt>
                    <dd>{clubDancers() ? clubDancers().length : "—"}</dd>
                  </div>
                </div>
                <div className="club-details-wrapper">
                  <dt className="club-region">Регіон:</dt>
                  <dd>
                    {clubRegion() && clubCity()
                      ? clubCity() + ", " + clubRegion()
                      : "Завантаження..."}
                  </dd>
                </div>
                <div className="club-details-wrapper">
                  <dt className="club-region">Керівник:</dt>
                  <dd>
                    {clubSupervisor() ? clubSupervisor() : "Завантаження..."}
                  </dd>
                </div>
                <div className="club-details-wrapper">
                  <dt className="club-region">Адреса:</dt>
                  <dd>{clubAddress() ? clubAddress() : "Завантаження..."}</dd>
                </div>
                {clubWebsite() && (
                  <div className="club-details-wrapper">
                    <dt className="club-region">Сайт:</dt>
                    <dd>
                      {
                        <a
                          href={`https://${clubWebsite()}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {clubWebsite()}
                        </a>
                      }
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
          <div className="club-dancers">
            <span className="club-dancers-title">Список танцюристів:</span>
            <div className="club-detail-dancers-wrapper">
              {dancers.length !== 0 && club["Dancers ok*"] ? (
                dancers
                  .filter((dancer) => club["Dancers ok*"]?.includes(dancer.id))
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
          <div className="club-dancers">
            <span className="club-dancers-title">Список тренерів:</span>
            <div className="club-detail-dancers-wrapper">
              {coaches.length !== 0 && club["Coaches ok"] ? (
                coaches
                  .filter((coach) => club["Coaches ok"]?.includes(coach.id))
                  .map((coach) => (
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
