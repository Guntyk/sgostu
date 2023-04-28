import AvatarPlaceholder from "../../../../../../../common/AvatarPlaceholder/AvatarPlaceholder";
import { dancerClassesSelector } from "../../../../../../../redux/dancerClasses/selectors";
import { dateToLocalFormat } from "../../../../../../../helpers/dateToLocalFormat";
import { getDancerClasses } from "../../../../../../../redux/dancerClasses/thunk";
import { dancersSelector } from "../../../../../../../redux/dancers/selectors";
import { clubsSelector } from "../../../../../../../redux/clubs/selectors";
import { getDancer } from "../../../../../../../redux/dancers/thunk";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { getClubs } from "../../../../../../../redux/clubs/thunk";
import Button from "../../../../../../../common/Button/Button";
import { useDispatch, useSelector } from "react-redux";
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
  const { goBack } = useHistory();
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
    } else if (typeof dancers === "object" && dancers.D_Name) {
      setDancer(dancers);
      setLoading(false);
    }
  }, [dancers]);

  return (
    <>
      {dancer !== {} && dancer.D_Name ? (
        <section className="dancer-info">
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
                {dancer.D_Surname.trim()} {dancer.D_Name.trim()}
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
                      .Class_Name.trim()}
                  </dd>
                </div>
                <div className="dancer-details-wrapper">
                  <dt className="dancer-club">Клуб:</dt>
                  <dd>
                    {String(
                      clubs
                        .filter((club) => club.id === Number(dancer["Club-"]))
                        .map((club) => club.Club_Name)
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
