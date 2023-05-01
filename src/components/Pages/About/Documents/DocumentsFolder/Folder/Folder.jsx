import { useHistory } from "react-router-dom";
import "./Folder.css";

export default function Folder({ type, typeId }) {
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
          <span>Відкрити</span>
          <hr />
          <hr />
          <hr />
          <hr />
        </div>
      </div>
      <span className="type-name">{type.name}</span>
    </div>
  );
}
