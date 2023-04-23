import Button from "../../../common/Button/Button";
import { useHistory } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  const language = window.localStorage.getItem("language");
  const { goBack } = useHistory();
  return (
    <article className="not-found">
      {window.scrollTo(0, 0)}
      <div className="not-found-wrapper">
        <h1 className="not-found-title">404</h1>
        <p className="not-found-text">
          <span>
            {language === "ua"
              ? "Ой! Ви потрапили на сторінку, яка знаходиться в розробці, або не існує 😔"
              : "Oh! You have reached a page that is under development or does not exist 😔"}
          </span>
        </p>
        <Button
          buttonText={language === "ua" ? "Повернутися" : "Back"}
          onClick={() => {
            goBack();
          }}
        />
      </div>
    </article>
  );
}
