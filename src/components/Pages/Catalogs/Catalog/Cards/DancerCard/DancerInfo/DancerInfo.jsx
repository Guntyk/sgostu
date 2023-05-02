import AvatarPlaceholder from "../../../../../../../common/AvatarPlaceholder/AvatarPlaceholder";
import { dancerClassesSelector } from "../../../../../../../redux/dancerClasses/selectors";
import { dateToLocalFormat } from "../../../../../../../helpers/dateToLocalFormat";
import { getDancerClasses } from "../../../../../../../redux/dancerClasses/thunk";
import { dancersSelector } from "../../../../../../../redux/dancers/selectors";
import { clubsSelector } from "../../../../../../../redux/clubs/selectors";
import BackButton from "../../../../../../../common/BackButton/BackButton";
import { getDancer } from "../../../../../../../redux/dancers/thunk";
import { getClubs } from "../../../../../../../redux/clubs/thunk";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import Loader from "../../../../../../Loader/Loader";
import { useState, useEffect } from "react";
import "./DancerInfo.css";

export default function DancerInfo() {
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

  return (
    <>
      {dancer !== {} && dancer["D Name"] ? (
        <section className="dancer-info">
          <BackButton />
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
                  <dt className="dancer-birth">Дата народження: </dt>
                  <dd>
                    {dancer.Birthday && dateToLocalFormat(dancer.Birthday)}
                  </dd>
                </div>
                <div className="dancer-details-wrapper">
                  <dt className="dancer-class">Клас: </dt>
                  <dd>
                    {dancerClasses
                      .filter(
                        (danceClass) =>
                          dancerClasses.indexOf(danceClass) + 1 ===
                          Number(dancer["Dancer Class"].at(-1))
                      )
                      .at(-1)
                      ["Class Name"].trim()}
                  </dd>
                </div>
                <div className="dancer-details-wrapper">
                  <dt className="dancer-club">Клуб:</dt>
                  <dd>
                    {String(
                      clubs
                        .filter(
                          (club) => club.id === Number(dancer["Clubs ok*"])
                        )
                        .map((club) => club["Club Name"])
                    )
                      .split("(")[0]
                      .trim()}
                  </dd>
                </div>
              </dl>
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
