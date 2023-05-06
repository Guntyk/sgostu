import AvatarPlaceholder from "../../../../../../../common/AvatarPlaceholder/AvatarPlaceholder";
import { judgeClassesSelector } from "../../../../../../../redux/judgeClasses/selectors";
import { statusesSelector } from "../../../../../../../redux/statuses/selectors";
import { getJudgeClasses } from "../../../../../../../redux/judgeClasses/thunk";
import { judgesSelector } from "../../../../../../../redux/judges/selectors";
import BackButton from "../../../../../../../common/BackButton/BackButton";
import { getStatuses } from "../../../../../../../redux/statuses/thunk";
import { getJudges } from "../../../../../../../redux/judges/thunk";
import { Redirect, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../../../../Loader/Loader";
import { useState, useEffect } from "react";
import "./JudgeInfo.css";

export default function JudgeInfo() {
  const judgeClasses = useSelector(judgeClassesSelector);
  const statuses = useSelector(statusesSelector);
  const judges = useSelector(judgesSelector);

  const [loading, setLoading] = useState(true);
  const [judge, setJudge] = useState(null);

  const { judgeId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (statuses.length === 0) {
      dispatch(getStatuses());
    }
  }, []);

  useEffect(() => {
    if (statuses.length !== 0) {
      if (judges.length === 0) {
        dispatch(getJudges(statuses));
      }
      if (judgeClasses.length === 0) {
        dispatch(getJudgeClasses());
      }
    }
  }, [statuses]);

  useEffect(() => {
    if (judges.length !== 0) {
      setLoading(false);
      judges.map((judge) => {
        if (Number(judge.id) === Number(judgeId)) {
          setJudge(judge);
        }
      });
    }
  }, [judges]);

  // Fields filling
  function judgeCategory() {
    return judgeClasses
      .filter(
        (judgeClass) =>
          judgeClasses.indexOf(judgeClass) + 1 ===
          Number(judge["Assigned Category Judge"].at(-1))
      )
      .at(-1)
      .Category.trim();
  }

  return (
    <>
      {judge ? (
        <section className="judge-info">
          <BackButton className="judge-info-back-btn" />
          {window.scrollTo(0, 0)}
          <div className="judge">
            {judge["Foto Judges"]?.url ? (
              <img
                className="judge-avatar"
                src={judge["Foto Judges"]?.url}
                alt="Аватар"
              />
            ) : (
              <AvatarPlaceholder />
            )}
            <div className="judge-inner">
              <h2 className="judge-name">
                {/* {`${coach["Coach Surname"].trim()} ${coach[
                  "Coach Name"
                ].trim()}`} */}
                {judge["Name Surname"].trim()}
              </h2>
              <dl className="judge-details">
                <div className="judge-details-wrapper">
                  <dt className="judge-city">Категорія:</dt>
                  <dd>
                    {judgeCategory() ? judgeCategory() : "Завантаження..."}
                  </dd>
                </div>
                <div className="judge-details-wrapper">
                  <dt className="judge-chief">Головний суддя:</dt>
                  <dd>{judge["Chief Judges"][0] === 1 ? "Так" : "Ні"}</dd>
                </div>
                <div className="judge-details-wrapper">
                  <dt className="judge-inspector">Спортивний інспектор:</dt>
                  <dd>{judge["Sport Inspector"][0] === 1 ? "Так" : "Ні"}</dd>
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
