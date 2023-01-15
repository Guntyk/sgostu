import { useEffect } from "react";
import Button from "../../../../common/Button/Button";
import Input from "../../../../common/Input/Input";
import "./Feedback.css";

export default function Feedback() {
  useEffect(() => {
    const labels = document.querySelectorAll(".form-control .label");

    labels.forEach((label) => {
      label.innerHTML = label.innerText
        .split("")
        .map(
          (letter, idx) =>
            `<span style="transition-delay:${idx * 50}ms">${letter}</span>`
        )
        .join("");
    });
  }, []);

  return (
    <article className="feedback">
      <div className="feedback-wrapper">
        <span className="feedback-title">Зворотній зв'язок</span>
        <form className="feedback-form">
          <Input labelText="Ім'я" name="name" required />
          <Input labelText="Номер телефону" type="tel" name="phone" required />
          <Input labelText="Ваше питання" name="message" textarea required />
          <Button
            className="feedback-btn"
            buttonText="Відіслати"
            type="submit"
          />
        </form>
      </div>
    </article>
  );
}
