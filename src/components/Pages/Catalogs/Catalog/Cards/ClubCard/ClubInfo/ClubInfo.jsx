import clubPlaceholder from "../../../../../../../materials/icons/clubcard/club-placeholder.jpg";
import { dancerClassesSelector } from "../../../../../../../redux/dancerClasses/selectors";
import { getDancerClasses } from "../../../../../../../redux/dancerClasses/thunk";
import { statusesSelector } from "../../../../../../../redux/statuses/selectors";
import { coachesSelector } from "../../../../../../../redux/coaches/selectors";
import { dancersSelector } from "../../../../../../../redux/dancers/selectors";
import { clubsSelector } from "../../../../../../../redux/clubs/selectors";
import BackButton from "../../../../../../../common/BackButton/BackButton";
import { getStatuses } from "../../../../../../../redux/statuses/thunk";
import { getCoaches } from "../../../../../../../redux/coaches/thunk";
import { getDancers } from "../../../../../../../redux/dancers/thunk";
import { getClubs } from "../../../../../../../redux/clubs/thunk";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import DancerCard from "../../DancerCard/DancerCard";
import Loader from "../../../../../../Loader/Loader";
import CoachCard from "../../CoachCard/CoachCard";
import { useState, useEffect } from "react";
import "./ClubInfo.css";

import Insta from "../../../../../../../materials/icons/Insta";
import Facebook from "../../../../../../../materials/icons/Facebook";

export default function ClubInfo() {
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
  function clubCity() {
    return club["Club Name"].split("(")[1].trim().slice(0, -1);
  }

  function clubSupervisor() {
    const name = `${club["SurName of Supervisor"]} ${club["Name of Supervisor"]}`;
    return name;
  }

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

  function clubSocials(socialType, socialField) {
    if (socialType === "phone") {
      if (String(socialField).slice(0, 1) === "+") {
        return socialField;
      } else if (Number(String(socialField).slice(0, 3)) === 380) {
        return `+${socialField}`;
      } else {
        return `+380${socialField}`;
      }
    } else if (socialType === "email") {
      if (socialField.includes("@")) {
        return socialField;
      }
    } else if (
      socialField.length >= 23 &&
      (socialField.includes(`https://m.${socialType}.com`) ||
        socialField.includes(`https://${socialType}.com`) ||
        socialField.includes(`https://www.${socialType}.com`) ||
        socialField.includes(`http://${socialType}.com`))
    ) {
      return socialField;
    } else if (socialField.includes("@") && socialField.length <= 30) {
      return `https://${socialType}.com/${socialField.slice(1)}`;
    } else if (
      socialField.length <= 30 &&
      (!socialField.includes(`https://m.${socialType}.com`) ||
        !socialField.includes(`https://${socialType}.com`) ||
        !socialField.includes(`https://www.${socialType}.com`) ||
        !socialField.includes(`http://${socialType}.com`))
    ) {
      return `https://${socialType}.com/${socialField}`;
    } else {
      return;
    }
  }

  return (
    <>
      {club ? (
        <section className="club-info">
          <BackButton />
          <div className="club">
            {club["Logo Clubs"]?.url ? (
              <img
                className="club-avatar"
                src={club["Logo Clubs"]?.url}
                alt="Аватар"
              />
            ) : (
              <img
                className="club-avatar club-avatar-placeholder"
                src={clubPlaceholder}
                alt="Логотип клубу"
              />
            )}
            <div className="club-inner">
              <h2 className="club-name">
                {club["Club Name"].split("(")[0].trim()}
              </h2>
              <dl className="club-details">
                <div className="club-dancers-coaches-quantity">
                  <div className="club-details-wrapper">
                    <dt className="coaches-quantity club-coaches">Тренерів:</dt>
                    <dd>{clubCoaches ? clubCoaches.length : "—"}</dd>
                  </div>
                  <div className="club-details-wrapper">
                    <dt className="dancers-quantity club-dancers">
                      Танцюристів:
                    </dt>
                    <dd>{clubDancers ? clubDancers.length : "—"}</dd>
                  </div>
                </div>
                <div className="club-details-wrapper">
                  <dt className="club-town">Місто:</dt>
                  <dd>{clubCity() ? clubCity() : "Завантаження..."}</dd>
                </div>
                <div className="club-details-wrapper">
                  <dt className="club-supervisor">Керівник:</dt>
                  <dd>
                    {clubSupervisor() ? clubSupervisor() : "Завантаження..."}
                  </dd>
                </div>
                <div className="club-details-wrapper">
                  <dt className="club-address">Адреса:</dt>
                  <dd>
                    {club["Address Club"]
                      ? club["Address Club"]
                      : "Завантаження..."}
                  </dd>
                </div>
                {club["Website club"] && (
                  <div className="club-details-wrapper">
                    <dt className="club-website">Сайт:</dt>
                    <dd>
                      {
                        <a
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
          <div className="club-detail-socials">
            {club.Facebook && club.Facebook?.length > 3 && (
              <a
                href={clubSocials("facebook", club.Facebook)}
                target="_blank"
                rel="noreferrer"
                className="dancer-social-btn dancer-detail-facebook"
              >
                <Facebook />
              </a>
            )}
            {club.Instagram && club.Instagram?.length > 3 && (
              <a
                href={clubSocials("instagram", club.Instagram)}
                target="_blank"
                rel="noreferrer"
                className="dancer-social-btn dancer-detail-instagram"
              >
                <Insta fill="#fff" />
              </a>
            )}
            {club["Phone Number Club"] && (
              <a
                href={`tel:${clubSocials("phone", club["Phone Number Club"])}`}
                className="dancer-social-btn dancer-detail-phone"
              >
                Phone Icon
              </a>
            )}
            {club["E-mail Club"] && (
              <a
                href={`mailto:${clubSocials("email", club["E-mail Club"])}`}
                target="_blank"
                rel="noreferrer"
                className="dancer-social-btn dancer-detail-email"
              >
                Email Icon
              </a>
            )}
          </div>
          {club["Perevagy Club"] && (
            <div className="club-advantages">{club["Perevagy Club"]}</div>
          )}
          <div className="event-detail-info-row">
            <ul className="event-detail-buttons">
              <li className="event-details-list active">Танцюристи</li>
              <li className="event-details-list">Тренери</li>
              <div className="indicator"></div>
            </ul>
          </div>
          {info === "Танцюристи" ? (
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
                  <h2 className="no-dancers-searched">Танцюристів немає</h2>
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
                  <h2 className="no-dancers-searched">Тренерів немає</h2>
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
