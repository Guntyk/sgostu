import { Link, useHistory } from "react-router-dom";
import "./Folder.css";

export default function Folder({ type, typeId }) {
  const screenWidth = window.screen.availWidth;
  const language = window.localStorage.getItem("language");
  const { push } = useHistory();
  return (
    <div className="folder-wrapper">
      <div
        className="folder"
        onClick={() => {
          push(`/documents/${typeId}`);
        }}
      >
        <div className="paper">
          <hr />
          <hr />
          <hr />
          <hr />
          <hr />
          <hr />
          <hr />
          <hr />
          <hr />
          <hr />
        </div>
        <div className="paper">
          <hr />
          <hr />
          <hr />
          <hr />
          <span>{language === "en" ? "Open" : "Відкрити"}</span>
          <hr />
          <hr />
          <hr />
          <hr />
        </div>
      </div>
      {screenWidth > 840 ? (
        <span className="type-name">
          {language === "en" ? type.name_en : type.name}
        </span>
      ) : (
        <Link className="type-name" to={`/documents/${typeId}`}>
          {language === "en" ? type.name_en : type.name}
        </Link>
      )}
    </div>
  );
}
