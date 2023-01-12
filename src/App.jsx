import NearestEvents from "./components/Main/NearestEvents/NearestEvents";
import Advantages from "./components/Main/Advantages/Advantages";
import { fetchEvents } from "./redux/events/thunk";
import About from "./components/Main/About/About";
import Header from "./components/Header/Header";
import Loader from "./components/Loader/Loader";
import Hero from "./components/Main/Hero/Hero";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { eventsSelector } from "./redux/events/selectors";
import Button from "./common/Button/Button";
import EventLi from "./EventLi";

export default function App() {
  const events = useSelector(eventsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(events);
  }, [events]);

  return (
    <>
      {/* <Loader /> */}
      {/* <Header /> */}
      <main>
        {/* <Hero /> */}
        {/* <About /> */}
        {/* <Advantages /> */}
        {/* <NearestEvents /> */}
      </main>
      <Button
        buttonText="Забрать данные"
        onClick={() => {
          console.log("Запрос отправлен");
          dispatch(fetchEvents());
        }}
      />
      <ul>
        {events.length !== 0 ? (
          events.map(
            (event) => <li key={event.id}>{event.attributes.title}</li>
          )
        ) : (
          <span>Мероприятий нет</span>
        )}
      </ul>
    </>
  );
}
