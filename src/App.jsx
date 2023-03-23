import EventInfo from "./components/Pages/Calendar/EventInfo/EventInfo";
import Catalog from "./components/Pages/Catalogs/Catalog/Catalog";
import NewsInfo from "./components/Pages/News/NewsInfo/NewsInfo";
import Calendar from "./components/Pages/Calendar/Calendar";
import Contacts from "./components/Pages/Contacts/Contacts";
import Feedback from "./components/Pages/Feedback/Feedback";
import NotFound from "./components/Pages/NotFound/NotFound";
import Catalogs from "./components/Pages/Catalogs/Catalogs";
import { sendMessageToBot } from "./api/requests";
import { Route, Switch } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Main from "./components/Pages/Main/Main";
import News from "./components/Pages/News/News";
import { useEffect, useState } from "react";

export default function App() {
  // const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   sendMessageToBot("Здійснено вхід на сайт");
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 8000);
  // }, []);

  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/calendar">
          <Calendar />
        </Route>
        <Route exact path="/calendar/:eventId">
          <EventInfo />
        </Route>
        {/* <Route exact path="/catalog">
          <Catalogs />
        </Route>
        <Route path="/catalog/:catalogs">
          <Catalog />
        </Route> */}
        <Route exact path="/contacts">
          <Contacts />
        </Route>
        <Route exact path="/feedback">
          <Feedback />
        </Route>
        <Route exact path="/news">
          <News />
        </Route>
        <Route exact path="/news/:articleId">
          <NewsInfo />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}
