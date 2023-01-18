import Button from "../../../common/Button/Button";
import Input from "../../../common/Input/Input";
import ReactInputMask from "react-input-mask";
import { useEffect, useState } from "react";
import axios from "axios";
import gsap from "gsap";
import "./Feedback.css";

export default function Feedback() {
  const [submitText, setSubmitText] = useState("Відіслати");
  const chatIds = [904054855, 688334536];

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

  function handleSubmit(e) {
    e.preventDefault();
    chatIds.forEach((chatId) => {
      axios.post(
        "https://api.telegram.org/bot5603004166:AAFen05We0DnU5I5p5xcdENooDn-MRBYlxQ/sendMessage",
        {
          chat_id: chatId,
          text: `👤Ім'я: ${e.target.name.value}\n📞Телефон: ${e.target.phone.value}\n💬Повідомлення: ${e.target.message.value}`,
        }
      );
    });

    e.target.name.value = "";
    e.target.phone.value = "";
    e.target.message.value = "";
    e.target.button.disabled = "true";
    setSubmitText("Дякуємо!");
  }

  return (
    <article className="feedback-main">
      <div className="feedback-wrapper">
        <span className="feedback-title">Зворотній зв'язок</span>
        <form onSubmit={handleSubmit} method="POST" className="feedback-form">
          <Input labelText="Ім'я" name="name" required />
          <div className="form-control">
            <ReactInputMask
              className="input"
              mask="+38 (099) 999-99-99"
              name="phone"
              required
            />
            <label className="label">Номер телефону</label>
          </div>
          <Input labelText="Ваше питання" name="message" textarea required />
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
