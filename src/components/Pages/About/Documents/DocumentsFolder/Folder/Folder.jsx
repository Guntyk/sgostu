import { useHistory } from "react-router-dom";
import "./Folder.css";

export default function Folder({ type }) {
  const { push } = useHistory();
  return (
    <div className="folder-wrapper">
      <div
        className="folder"
        onClick={() => {
          push(`/documents/${type.slice(-1)}`);
        }}
      >
        <div className="paper">
          <hr />
          <hr />
          <hr />
          <hr />
          <span>Open</span>
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
          <span>Open</span>
          <hr />
          <hr />
          <hr />
          <hr />
        </div>
      </div>
      <span className="type-name">{type}</span>
    </div>
  );
}
