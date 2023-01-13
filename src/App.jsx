import NearestEvents from "./components/Main/NearestEvents/NearestEvents";
import Advantages from "./components/Main/Advantages/Advantages";
import { eventsSelector } from "./redux/events/selectors";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "./redux/events/thunk";
import About from "./components/Main/About/About";
import Header from "./components/Header/Header";
import Loader from "./components/Loader/Loader";
import Hero from "./components/Main/Hero/Hero";
import Button from "./common/Button/Button";
import { useEffect } from "react";

export default function App() {
  return (
    <>
      {/* <Loader /> */}
      {/* <Header /> */}
      <main>
        {/* <Hero /> */}
        {/* <About /> */}
        {/* <Advantages /> */}
        <NearestEvents />
      </main>
      {/* <Button
        buttonText="Забрать данные"
        onClick={() => {
          console.log("Запрос отправлен");
          dispatch(fetchEvents());
        }}
      />
      <ul>
        {events.length !== 0 ? (
          events.map((event) => (
            <li key={event.id}>
              {event.attributes.title} {event.attributes.start}
            </li>
          ))
        ) : (
          <span>Мероприятий нет</span>
        )}
      </ul> */}
    </>
  );
}
