import { useEffect, useState } from "react";
import Folder from "./Folder/Folder";
import { cards } from "../data";
import "./DocumentsFolder.css";

export default function DocumentsFolder() {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const cardTypes = [];
    cards.map((card) => {
      !cardTypes.includes(card.attributes.type) &&
        cardTypes.push(card.attributes.type);
    });
    setTypes(cardTypes);
  }, []);

  return (
    <div className="folders-wrapper">
      <div className="folders">
        {types.map((type) => (
          <Folder type={type} key={type} />
        ))}
      </div>
    </div>
  );
}
