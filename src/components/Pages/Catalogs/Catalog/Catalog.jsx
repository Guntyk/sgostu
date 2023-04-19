import { dancersSelector } from "../../../../redux/dancers/selectors";
import { getDancers, getMoreDancers } from "../../../../redux/dancers/thunk";
import { statusesSelector } from "../../../../redux/statuses/selectors";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../../../common/Input/Input";
import DancerCard from "./DancerCard/DancerCard";
import { useHistory, useParams } from "react-router-dom";
import Loader from "../../../Loader/Loader";
import { useEffect } from "react";
import { useState } from "react";
import "./Catalog.css";
import { getStatuses } from "../../../../redux/statuses/thunk";
import Button from "../../../../common/Button/Button";

export default function Dancers() {
  const [catalogTheme, setCatalogTheme] = useState(false);
  const statuses = useSelector(statusesSelector);
  const dancers = useSelector(dancersSelector);
  const coaches = [];
  const clubs = [];
  const judges = [];
  const { catalogs } = useParams();
  const dispatch = useDispatch();
  const { goBack } = useHistory();

  useEffect(() => {
    if (statuses.length === 0) {
      dispatch(getStatuses());
    }
    if (
      catalogs === "dancers" ||
      catalogs === "coaches" ||
      catalogs === "clubs" ||
      catalogs === "judges"
    ) {
      setCatalogTheme(true);
      if (catalogs === "dancers" && dancers.length === 0) {
        dispatch(getDancers());
      }
      if (catalogs === "coaches" && coaches.length === 0) {
        // dispatch(getDancers());
      }
      if (catalogs === "clubs" && clubs.length === 0) {
        // dispatch(getDancers());
      }
      if (catalogs === "judges" && judges.length === 0) {
        // dispatch(getDancers());
      }
    }
  }, []);

  return (
    <>
      {catalogTheme ? (
        <div className="catalog">
          <div className="container">
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
            {catalogs === "dancers" && dancers.length !== 0 ? (
              <>
                <h1 className="catalog-title">Танцюристи</h1>
                <Input
                  inputClassName="catalog-search"
                  placeholderText="Пошук"
                />
                <div className="catalog-wrapper">
                  {dancers
                    .filter((dancer) =>
                      statuses
                        .filter((status) => status.Name !== "Не активний")
                        .map((status) => status.Dancers)
                        .flat()
                        .includes(dancer.id)
                    )
                    .map((dancer) => (
                      <DancerCard dancer={dancer} key={dancer.id} />
                    ))}
                </div>
              </>
            ) : (
              <Loader />
            )}
            {catalogs === "coaches" && (
              <>
                <h1 className="catalog-title">Тренери</h1>
                <Input
                  inputClassName="catalog-search"
                  placeholderText="Пошук"
                />
                {/* <div className="catalog-wrapper">
              {dancers.map((dancer) => (
                <DancerCard dancer={dancer} />
              ))}
            </div> */}
              </>
            )}
            {catalogs === "clubs" && (
              <>
                <h1 className="catalog-title">Клуби</h1>
                <Input
                  inputClassName="catalog-search"
                  placeholderText="Пошук"
                />
                {/* <div className="catalog-wrapper">
              {dancers.map((dancer) => (
                <DancerCard dancer={dancer} />
              ))}
            </div> */}
              </>
            )}
            {catalogs === "judges" && (
              <>
                <h1 className="catalog-title">Судді</h1>
                <Input
                  inputClassName="catalog-search"
                  placeholderText="Пошук"
                />
                {/* <div className="catalog-wrapper">
              {dancers.map((dancer) => (
                <DancerCard dancer={dancer} />
              ))}
            </div> */}
              </>
            )}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}
