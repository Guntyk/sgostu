import { sendMessageToBot } from "../../../api/bot";
import Button from "../../../common/Button/Button";
import Input from "../../../common/Input/Input";
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

    setSubmitText(language === "en" ? "Send" : "Відіслати");
  }, [language]);

  function handleSubmit(e) {
    e.preventDefault();
    const message = `👤Ім'я: ${e.target.name.value}\n📞Телефон: ${e.target.phone.value}\n💬Повідомлення: ${e.target.message.value}`;
    sendMessageToBot(message);

    e.target.name.value = "";
    e.target.phone.value = "";
    e.target.message.value = "";
    e.target.button.disabled = "true";
    setSubmitText(language === "en" ? "Thanks!" : "Дякуємо!");
  }

  return (
    <article className="feedback-main">
      {window.scrollTo(0, 0)}
      <div className="feedback-wrapper">
        <span className="feedback-title">
          {language === "en" ? "Feedback" : "Зворотній зв'язок"}
        </span>
        <form onSubmit={handleSubmit} className="feedback-form">
          <Input
            labelText={language === "en" ? "Name" : "Ім'я"}
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
              {language === "en" ? "Phone number" : "Номер телефону"}
            </label>
          </div>
          <Input
            labelText={language === "en" ? "Your question" : "Ваше питання"}
            name="message"
            textarea
            required
          />
          <Button
            className="feedback-btn"
            buttonText={submitText}
            name="button"
            type="submit"
          />
        </form>
      </div>
    </article>
  );
}
