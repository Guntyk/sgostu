import { useHistory } from "react-router-dom";
import Button from "../../../common/Button/Button";
import "./NotFound.css";

export default function NotFound() {
  const { push } = useHistory();
  return (
    <article className="not-found">
      <div className="not-found-wrapper">
        <h1 className="not-found-title">404</h1>
        <p className="not-found-text">
          <span>Ой!</span> Ви потрапили на сторінку, яка знаходиться в розробці, або не існує 😔
        </p>
        <Button
          buttonText="На головну"
          onClick={() => {
            push("/");
          }}
        />
      </div>
    </article>
  );
}
