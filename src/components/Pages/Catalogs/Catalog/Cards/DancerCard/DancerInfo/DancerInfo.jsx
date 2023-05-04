import AvatarPlaceholder from "../../../../../../../common/AvatarPlaceholder/AvatarPlaceholder";
import { dancerClassesSelector } from "../../../../../../../redux/dancerClasses/selectors";
import { getDancerClasses } from "../../../../../../../redux/dancerClasses/thunk";
import { dancersSelector } from "../../../../../../../redux/dancers/selectors";
import { clubsSelector } from "../../../../../../../redux/clubs/selectors";
import BackButton from "../../../../../../../common/BackButton/BackButton";
import { getDancer } from "../../../../../../../redux/dancers/thunk";
import { getClubs } from "../../../../../../../redux/clubs/thunk";
import { Link, Redirect, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../../../../Loader/Loader";
import { useState, useEffect } from "react";
import "./DancerInfo.css";
import "../Colors.css";
import Facebook from "../../../../../../../materials/icons/Facebook";
import Insta from "../../../../../../../materials/icons/Insta";
import Tiktok from "../../../../../../../materials/icons/Tiktok";

export default function DancerInfo() {
  window.scrollTo(0, 0);
  const dancerClasses = useSelector(dancerClassesSelector);
  const dancers = useSelector(dancersSelector);
  const clubs = useSelector(clubsSelector);

  const [loading, setLoading] = useState(true);
  const [dancer, setDancer] = useState({});

  const { dancerId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (dancers.length === 0) {
      dispatch(getDancer(dancerId));
      dispatch(getDancerClasses());
      dispatch(getClubs());
    }
  }, []);

  useEffect(() => {
    if (Array.isArray(dancers) && dancers.length > 1) {
      setDancer(...dancers.filter((dancer) => dancer.id === Number(dancerId)));
      setLoading(false);
    } else if (typeof dancers === "object" && dancers["D Name"]) {
      setDancer(dancers);
      setLoading(false);
    }
  }, [dancers]);

  function dancerClub() {
    return clubs.filter((club) => club.id === Number(dancer["Clubs ok*"]))[0];
  }

  function dancerClass(coefficient) {
    const dancerClass = dancerClasses
      .filter(
        (danceClass) =>
          (coefficient === "current"
            ? dancerClasses.indexOf(danceClass) + 1
            : dancerClasses.indexOf(danceClass)) ===
          (coefficient === "prev"
            ? Number(dancer["Dancer Class"].at(-1) - 2)
            : Number(dancer["Dancer Class"].at(-1)))
      )
      .at(-1);
    return dancerClass !== undefined && dancerClass["Class Name"]?.trim();
  }

  return (
    <>
      {dancer !== {} && dancer["D Name"] ? (
        <section className="dancer-info">
          <BackButton className="detail-catalog-info-button" />
          <div className="dancer">
            {dancer.Dancer_Foto?.url ? (
              <img
                className="dancer-avatar"
                src={dancer.Dancer_Foto?.url}
                alt="Аватар"
              />
            ) : (
              <AvatarPlaceholder />
            )}
            <div className="dancer-inner">
              <h2 className="dancer-name">
                {dancer["D Surname"].trim()} {dancer["D Name"].trim()}
              </h2>
              <dl className="dancer-details">
                <div className="dancer-details-wrapper">
                  <dt className="dancer-club">Клуб:</dt>
                  <dd className="dancer-detail-club-name">
                    {dancerClub() ? (
                      <Link to={`/catalogs/clubs/${dancerClub().id}`}>
                        {dancerClub()["Club Name"].split("(")[0].trim()}
                      </Link>
                    ) : (
                      "Завантаження..."
                    )}
                  </dd>
                </div>
              </dl>
              {dancerClasses.length !== 0 ? (
                <div className="dancer-detail-class-wrapper">
                  <span
                    className={`dancer-detail-class dancer-detail-prev-class ${
                      dancerClass("current") !== "No Class" &&
                      dancerClass("prev")
                    }`}
                  >
                    {dancerClass("current") === ("No Class" || "Debut")
                      ? ""
                      : dancerClass("prev")}
                  </span>
                  <span
                    className={`dancer-detail-class dancer-detail-current-class ${dancerClass(
                      "current"
                    )}`}
                  >
                    {dancerClass("current")}
                  </span>
                  <span
                    className={`dancer-detail-class dancer-detail-next-class ${dancerClass(
                      "next"
                    )}`}
                  >
                    {dancerClass("current") === ("No Class" || "Pro")
                      ? ""
                      : dancerClass("next")}
                  </span>
                </div>
              ) : (
                "Завантаження..."
              )}
            </div>
          </div>
          {/* <div className="dancer-detail-socials">
            {dancer.Facebook ? (
              <a
                href={dancer.Facebook}
                className="dancer-social-btn dancer-detail-facebook"
              >
                <Facebook />
              </a>
            ) : null}
            {dancer.Instagram ? (
              <a
                href={dancer.Instagram}
                target="_blank"
                rel="noreferrer"
                className="dancer-social-btn dancer-detail-instagram"
              >
                <Insta fill="#fff" />
              </a>
            ) : null}
            {dancer.Tiktok ? (
              <a
                href={dancer.TikTok}
                className="dancer-social-btn dancer-detail-tiktok"
              >
                <Tiktok />
              </a>
            ) : null}
          </div> */}
        </section>
      ) : !loading ? (
        <Redirect to="/not-found" />
      ) : (
        <Loader />
      )}
    </>
  );
}
