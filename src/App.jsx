import Calendar from "./components/Pages/Calendar/Calendar";
import { Route, Switch } from "react-router-dom";
import Header from "./components/Header/Header";
import Loader from "./components/Loader/Loader";
import Footer from "./components/Footer/Footer";
import Main from "./components/Pages/Main/Main";

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
      {/* <Footer /> */}
    </>
  );
}
