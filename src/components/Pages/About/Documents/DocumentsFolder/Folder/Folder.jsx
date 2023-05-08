import { useHistory } from "react-router-dom";
import "./Folder.css";

export default function Folder({ type, typeId }) {
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
          <span>{language === "ua" ? "Відкрити" : "Open"}</span>
          <hr />
          <hr />
          <hr />
          <hr />
        </div>
      </div>
      <span className="type-name">
        {language === "ua" ? type.name : type.name_en}
      </span>
    </div>
  );
}
