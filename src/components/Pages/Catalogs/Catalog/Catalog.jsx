import DancerCard from "./DancerCard/DancerCard";
import { useParams } from "react-router-dom";
import { Context } from "../../../..";
import { useContext } from "react";
import "./Dancers.css";

export default function Dancers() {
  const { dancers } = useContext(Context);
  const { catalog } = useParams();

  return (
    <div className="catalog">
      <div className="container">
        <h1 className="catalog-title">Title</h1>
        <div className="catalog-wrapper">
          {dancers.map((dancer) => (
            <DancerCard dancer={dancer} />
          ))}
        </div>
      </div>
    </div>
  );
}
