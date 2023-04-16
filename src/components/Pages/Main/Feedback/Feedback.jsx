import { sendMessageToBot } from "../../../../api/requests";
import Button from "../../../../common/Button/Button";
import Input from "../../../../common/Input/Input";
import ReactInputMask from "react-input-mask";
import { useEffect, useState } from "react";
import "./Feedback.css";

export default function Feedback() {
  const language = window.localStorage.getItem("language");
  const [submitText, setSubmitText] = useState();
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

    setSubmitText(language === "ua" ? "Відіслати" : "Send");
  }, [language]);

  function handleSubmit(e) {
    e.preventDefault();
    const message = `👤Ім'я: ${e.target.name.value}\n📞Телефон: ${e.target.phone.value}\n💬Повідомлення: ${e.target.message.value}`;
    sendMessageToBot(message);

    e.target.name.value = "";
    e.target.phone.value = "";
    e.target.message.value = "";
    e.target.button.disabled = "true";
    setSubmitText(language === "ua" ? "Дякуємо!" : "Thanks!");
  }

  return (
    <article className="feedback">
      <div className="feedback-wrapper">
        <span className="feedback-title">
          {language === "ua" ? "Зворотній зв'язок" : "Feedback"}
        </span>
        <form onSubmit={handleSubmit} className="feedback-form">
          <Input
            labelText={language === "ua" ? "Ім'я" : "Name"}
            name="name"
            required
          />
          <div className="form-control">
            <ReactInputMask
              className="input"
              mask="+38 (099) 999-99-99"
              name="phone"
              required
            />
            <label className="label">
              {language === "ua" ? "Номер телефону" : "Phone number"}
            </label>
          </div>
          <Input
            labelText={language === "ua" ? "Ваше питання" : "Your question"}
            name="message"
            textarea
            required
          />
          <Button
            className="feedback-btn"
            name="button"
            buttonText={submitText}
            type="submit"
          />
        </form>
      </div>
    </article>
  );
}
