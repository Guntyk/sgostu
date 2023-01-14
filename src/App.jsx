import Calendar from "./components/Pages/Calendar/Calendar";
import { Route, Switch } from "react-router-dom";
import Header from "./components/Header/Header";
import Loader from "./components/Loader/Loader";
import Main from "./components/Pages/Main/Main";
import Button from "./common/Button/Button";
// import "./components/media.css";

export default function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/">
          {/* <Loader /> */}
          <Main />
        </Route>
        <Route exact path="/calendar">
          <Calendar />
        </Route>
      </Switch>
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
