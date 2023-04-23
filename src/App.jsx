import EventInfo from "./components/Pages/Calendar/EventInfo/EventInfo";
import Catalog from "./components/Pages/Catalogs/Catalog/Catalog";
import NewsInfo from "./components/Pages/News/NewsInfo/NewsInfo";
import Calendar from "./components/Pages/Calendar/Calendar";
import Contacts from "./components/Pages/Contacts/Contacts";
import Feedback from "./components/Pages/Feedback/Feedback";
import NotFound from "./components/Pages/NotFound/NotFound";
import Catalogs from "./components/Pages/Catalogs/Catalogs";
import CoachInfo from "./components/Pages/Catalogs/Catalog/CoachCard/CoachInfo/CoachInfo";
import About from "./components/Pages/About/About";
import { Route, Switch } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Main from "./components/Pages/Main/Main";
import News from "./components/Pages/News/News";
import DancerInfo from "./components/Pages/Catalogs/Catalog/DancerCard/DancerInfo/DancerInfo";

export default function App() {
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
        <Route exact path="/catalogs">
          <Catalogs />
        </Route>
        <Route path="/catalogs/:catalogs">
          <Catalog />
        </Route>
        <Route path="/coach-info">
          <CoachInfo />
        </Route>
        <Route path="/dancer-info">
          <DancerInfo />
        </Route>
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
        <Route exact path="/about">
          <About />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}
