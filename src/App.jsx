import DancerInfo from "./components/Pages/Catalogs/Catalog/DancersCatalog/DancerCard/DancerInfo/DancerInfo";
import EventInfo from "./components/Pages/Calendar/EventInfo/EventInfo";
import Catalog from "./components/Pages/Catalogs/Catalog/Catalog";
import NewsInfo from "./components/Pages/News/NewsInfo/NewsInfo";
import Calendar from "./components/Pages/Calendar/Calendar";
import Contacts from "./components/Pages/Contacts/Contacts";
import Feedback from "./components/Pages/Feedback/Feedback";
import NotFound from "./components/Pages/NotFound/NotFound";
import Catalogs from "./components/Pages/Catalogs/Catalogs";
import About from "./components/Pages/About/About";
import { Route, Switch } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Main from "./components/Pages/Main/Main";
import News from "./components/Pages/News/News";

export default function App() {
  return (
    <>
      <Header />
      <Switch>
        {/* Main Page */}
        <Route exact path="/">
          <Main />
        </Route>
        {/* Calendar */}
        <Route exact path="/calendar">
          <Calendar />
        </Route>
        <Route exact path="/calendar/:eventId">
          <EventInfo />
        </Route>
        {/* Catalogs */}
        <Route exact path="/catalogs">
          <Catalogs />
        </Route>
        <Route exact path="/catalogs/:catalogs">
          <Catalog />
        </Route>
        {/* <Route path="/catalogs/:catalogs/:coachId">
          <CoachInfo />
        </Route> */}
        <Route exact path="/catalogs/:catalogs/:dancerId">
          <DancerInfo />
        </Route>
        {/* Contacts */}
        <Route exact path="/contacts">
          <Contacts />
        </Route>
        {/* Feedback */}
        <Route exact path="/feedback">
          <Feedback />
        </Route>
        {/* News */}
        <Route exact path="/news">
          <News />
        </Route>
        <Route exact path="/news/:articleId">
          <NewsInfo />
        </Route>
        {/* About */}
        <Route exact path="/about">
          <About />
        </Route>
        {/* Not Found */}
        <Route>
          <NotFound />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}
