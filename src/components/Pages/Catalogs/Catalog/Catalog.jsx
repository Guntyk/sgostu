import { dancersSelector } from "../../../../redux/dancers/selectors";
import { getDancers } from "../../../../redux/dancers/thunk";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../../../common/Input/Input";
import DancerCard from "./DancerCard/DancerCard";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import "./Catalog.css";
import { useState } from "react";
import Loader from "../../../Loader/Loader";

export default function Dancers() {
  const [catalogTheme, setCatalogTheme] = useState(false);
  const dancers = useSelector(dancersSelector);
  const coaches = [];
  const clubs = [];
  const judges = [];
  const { catalogs } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (catalogs === "dancers") {
      setCatalogTheme(true);
      if (dancers.length === 0) {
        dispatch(getDancers());
      }
    }
    if (catalogs === "coaches") {
      setCatalogTheme(true);
      if (coaches.length === 0) {
        alert("Getting coaches");
        // dispatch(getDancers());
      }
    }
    if (catalogs === "clubs") {
      setCatalogTheme(true);
      if (clubs.length === 0) {
        alert("Getting clubs");
        // dispatch(getDancers());
      }
    }
    if (catalogs === "judges") {
      setCatalogTheme(true);
      if (judges.length === 0) {
        alert("Getting judges");
        // dispatch(getDancers());
      }
    }
  }, []);

  return (
    <>
      {catalogTheme ? (
        <div className="catalog">
          <div className="container">
            {catalogs === "dancers" && (
              <>
                <h1 className="catalog-title">Танцюристи</h1>
                <Input
                  inputClassName="catalog-search"
                  placeholderText="Пошук"
                />
                <div className="catalog-wrapper">
                  {dancers.map((dancer) => (
                    <DancerCard dancer={dancer} key={dancer.id} />
                  ))}
                </div>
              </>
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
