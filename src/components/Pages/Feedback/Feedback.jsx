import ReactInputMask from 'react-input-mask';
import { useEffect, useState } from 'react';
import { sendMessageToBot } from 'api/bot';
import Button from 'common/Button/Button';
import Input from 'common/Input/Input';
import './Feedback.css';

export default function Feedback() {
  const language = window.localStorage.getItem('language');
  const [submitText, setSubmitText] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const labels = document.querySelectorAll('.form-control .label');

    labels.forEach(({ innerHTML, innerText }) => {
      innerHTML = innerText
        .split('')
        .map((letter, idx) => `<span style="transition-delay:${idx * 50}ms">${letter}</span>`)
        .join('');
    });

    setSubmitText(language === 'en' ? 'Send' : 'Відіслати');
  }, [language]);

  function handleSubmit(e) {
    e.preventDefault();

    const { name, phone, message, button } = e.target;
    const messageToSend = `👤Ім'я: ${name.value}\n📞Телефон: ${phone.value}\n💬Повідомлення: ${message.value}`;
    sendMessageToBot(messageToSend);

    name.value = '';
    phone.value = '';
    message.value = '';
    button.disabled = 'true';
    setSubmitText(language === 'en' ? 'Thanks!' : 'Дякуємо!');
  }

  return (
    <article className='feedback-main'>
      {}
      <div className='feedback-wrapper'>
        <span className='feedback-title'>{language === 'en' ? 'Feedback' : "Зворотній зв'язок"}</span>
        <form onSubmit={handleSubmit} className='feedback-form'>
          <Input labelText={language === 'en' ? 'Name' : "Ім'я"} name='name' required />
          <div className='form-control'>
            <ReactInputMask className='input' mask='+38 (099) 999-99-99' name='phone' required />
            <label className='label'>{language === 'en' ? 'Phone number' : 'Номер телефону'}</label>
          </div>
          <Input labelText={language === 'en' ? 'Your question' : 'Ваше питання'} name='message' textarea required />
          <Button className='feedback-btn' buttonText={submitText} name='button' type='submit' />
        </form>
      </div>
    </article>
  );
}
