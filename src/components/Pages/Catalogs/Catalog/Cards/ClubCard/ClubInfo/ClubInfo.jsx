import clubPlaceholder from "../../../../../../../materials/icons/clubcard/club-placeholder.jpg";
import { dancerClassesSelector } from "../../../../../../../redux/dancerClasses/selectors";
import { socialsFormatting } from "../../../../../../../helpers/socialsFormatting";
import { getDancerClasses } from "../../../../../../../redux/dancerClasses/thunk";
import { statusesSelector } from "../../../../../../../redux/statuses/selectors";
import { coachesSelector } from "../../../../../../../redux/coaches/selectors";
import { dancersSelector } from "../../../../../../../redux/dancers/selectors";
import { clubsSelector } from "../../../../../../../redux/clubs/selectors";
import BackButton from "../../../../../../../common/BackButton/BackButton";
import { getStatuses } from "../../../../../../../redux/statuses/thunk";
import { getCoaches } from "../../../../../../../redux/coaches/thunk";
import { getDancers } from "../../../../../../../redux/dancers/thunk";
import Facebook from "../../../../../../../materials/icons/Facebook";
import EmailIcon from "../../../../../../../materials/icons/Email";
import PhoneIcon from "../../../../../../../materials/icons/Phone";
import { getClubs } from "../../../../../../../redux/clubs/thunk";
import Insta from "../../../../../../../materials/icons/Insta";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import DancerCard from "../../DancerCard/DancerCard";
import Loader from "../../../../../../Loader/Loader";
import CoachCard from "../../CoachCard/CoachCard";
import { useState, useEffect } from "react";
import "./ClubInfo.css";

export default function ClubInfo() {
  const language = window.localStorage.getItem("language");
  const dancerClasses = useSelector(dancerClassesSelector);
  const statuses = useSelector(statusesSelector);
  const coaches = useSelector(coachesSelector);
  const dancers = useSelector(dancersSelector);
  const clubs = useSelector(clubsSelector);

  const [clubCoaches, setClubCoaches] = useState([]);
  const [clubDancers, setClubDancers] = useState([]);
  const [info, setInfo] = useState("Танцюристи");
  const [loading, setLoading] = useState(true);
  const [club, setClub] = useState(null);

  const { clubId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (statuses.length === 0) {
      dispatch(getStatuses());
    }
  }, []);

  useEffect(() => {
    if (statuses.length !== 0) {
      if (clubs.length === 0) {
        dispatch(getClubs());
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
      clubs.map((club) => {
        if (Number(club.id) === Number(clubId)) {
          setClub(club);
        }
      });
    }
  }, [clubs]);

  useEffect(() => {
    if (club) {
      const list = document.querySelectorAll(".event-details-list");
      function activeLink() {
        list.forEach((item) => item.classList.remove("active"));
        this.classList.add("active");
        setInfo(this.innerText);
      }
      list.forEach((item) => item.addEventListener("click", activeLink));
      if (dancers) {
        setClubDancers(
          dancers.filter((dancer) => club["Dancers ok*"]?.includes(dancer.id))
        );
      }
      if (coaches) {
        setClubCoaches(
          coaches.filter((coach) => club["Coaches ok"]?.includes(coach.id))
        );
      }
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [club, dancers, coaches]);

  // Fields filling
  function clubWebsite(clubWebsite, fieldType) {
    if (fieldType === "href") {
      if (clubWebsite.includes("https://") || clubWebsite.includes("http://")) {
        return clubWebsite;
      } else {
        return `https://${clubWebsite}`;
      }
    } else if (fieldType === "link") {
      let link =
        club["Website club"].slice(-1) === "/"
          ? club["Website club"].slice(0, -1)
          : club["Website club"];
      return link.includes("https://")
        ? link.slice(8)
        : link.includes("http://")
        ? link.slice(7)
        : link;
    }
  }

  return (
    <>
      {club ? (
        <section className="club-info">
          <BackButton />
          <div className="club">
            <img
              className="club-avatar"
              src={
                club["Logo Clubs"]?.url
                  ? club["Logo Clubs"]?.url
                  : clubPlaceholder
              }
              alt="Логотип клубу"
            />

            <div className="club-inner">
              {club["Club Name"] && (
                <h2 className="club-name">
                  {club["Club Name"].split("(")[0].trim()}
                </h2>
              )}
              <dl className="club-details">
                <div className="club-dancers-coaches-quantity">
                  <div className="club-details-wrapper">
                    <dt className="coaches-quantity club-coaches">
                      {language === "en" ? "Coaches:" : "Тренерів:"}
                    </dt>
                    <dd>{clubCoaches.length > 0 ? clubCoaches.length : "—"}</dd>
                  </div>
                  <div className="club-details-wrapper">
                    <dt className="dancers-quantity club-dancers">
                      {language === "en" ? "Dancers:" : "Танцюристів:"}
                    </dt>
                    <dd>{clubDancers.length > 0 ? clubDancers.length : "—"}</dd>
                  </div>
                </div>
                {club["Address Club"] && (
                  <div className="club-details-wrapper">
                    <dt className="club-address">
                      {language === "en" ? "Address:" : "Адреса:"}
                    </dt>
                    <dd>{club["Address Club"]}</dd>
                  </div>
                )}
                {(club["SurName of Supervisor"] ||
                  club["Name of Supervisor"]) && (
                  <div className="club-details-wrapper">
                    <dt className="club-supervisor">
                      {language === "en" ? "Supervisor:" : "Керівник:"}
                    </dt>
                    <dd>
                      {club["SurName of Supervisor"]}{" "}
                      {club["Name of Supervisor"]}
                    </dd>
                  </div>
                )}
                {club["Club Name"] && (
                  <div className="club-details-wrapper">
                    <dt className="club-town">
                      {language === "en" ? "Town:" : "Місто:"}
                    </dt>
                    <dd>
                      {club["Club Name"].split("(")[1].trim().slice(0, -1)}
                    </dd>
                  </div>
                )}
                {club["Website club"] && (
                  <div className="club-details-wrapper">
                    <dt className="club-website">
                      {language === "en" ? "Website:" : "Сайт:"}
                    </dt>
                    <dd>
                      {
                        <a
                          className="linked"
                          href={clubWebsite(club["Website club"], "href")}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {clubWebsite(club["Website club"], "link")}
                        </a>
                      }
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
          {(club["Phone Number Club"] ||
            club["E-mail Club"] ||
            club.Facebook ||
            club.Instagram) && (
            <div className="detail-socials-wrapper">
              {club.Facebook &&
                club.Facebook?.length > 3 &&
                String(socialsFormatting("facebook", club.Facebook)).length >
                  21 && (
                  <a
                    href={socialsFormatting("facebook", club.Facebook)}
                    target="_blank"
                    rel="noreferrer"
                    className="social-btn facebook"
                  >
                    <Facebook />
                  </a>
                )}
              {club.Instagram &&
                club.Instagram?.length > 3 &&
                String(socialsFormatting("instagram", club.Instagram)).length >
                  22 && (
                  <a
                    href={socialsFormatting("instagram", club.Instagram)}
                    target="_blank"
                    rel="noreferrer"
                    className="social-btn instagram"
                  >
                    <Insta fill="#fff" />
                  </a>
                )}
              {club["Phone Number Club"] && (
                <a
                  href={`tel:${socialsFormatting(
                    "phone",
                    club["Phone Number Club"]
                  )}`}
                  className="social-btn phone"
                >
                  <PhoneIcon />
                </a>
              )}
              {club["E-mail Club"] && (
                <a
                  href={`mailto:${socialsFormatting(
                    "email",
                    club["E-mail Club"]
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="social-btn email"
                >
                  <EmailIcon />
                </a>
              )}
            </div>
          )}
          {club["Perevagy Club"] && (
            <div className="club-advantages">{club["Perevagy Club"]}</div>
          )}
          <div className="event-detail-info-row">
            <ul className="event-detail-buttons">
              <li className="event-details-list active">
                {language === "en" ? "Dancers" : "Танцюристи"}
              </li>
              <li className="event-details-list">
                {language === "en" ? "Coaches" : "Тренери"}
              </li>
              <div className="indicator"></div>
            </ul>
          </div>
          {info === "Танцюристи" || info === "Dancers" ? (
            <div className="club-catalog club-dancers">
              <div className="club-detail-dancers-wrapper">
                {clubDancers.length !== 0 && !loading ? (
                  clubDancers.map((dancer) => (
                    <DancerCard
                      screenWidth={window.screen.availWidth}
                      classes={dancerClasses}
                      dancer={dancer}
                      clubs={clubs}
                      key={dancer.id}
                    />
                  ))
                ) : !loading && dancers.length > 0 ? (
                  <h2 className="no-dancers-searched">
                    {language === "en" ? "No dancers" : "Танцюристів немає"}
                  </h2>
                ) : (
                  <Loader className="club-catalog-loader" />
                )}
              </div>
            </div>
          ) : (
            <div className="club-catalog club-dancers">
              <div className="club-detail-dancers-wrapper">
                {clubCoaches.length !== 0 && !loading ? (
                  clubCoaches.map((coach) => (
                    <CoachCard
                      screenWidth={window.screen.availWidth}
                      dancerClasses={dancerClasses}
                      dancers={dancers}
                      coach={coach}
                      clubs={clubs}
                      key={coach.id}
                    />
                  ))
                ) : !loading && coaches.length > 0 ? (
                  <h2 className="no-dancers-searched">
                    {language === "en" ? "No coaches" : "Тренерів немає"}
                  </h2>
                ) : (
                  <Loader className="club-catalog-loader" />
                )}
              </div>
            </div>
          )}
        </section>
      ) : !loading ? (
        <Redirect to="/not-found" />
      ) : (
        <Loader />
      )}
    </>
  );
}
