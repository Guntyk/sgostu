import DancerInfo from "./components/Pages/Catalogs/Catalog/Cards/DancerCard/DancerInfo/DancerInfo";
import DocumentsFolder from "./components/Pages/About/Documents/DocumentsFolder/DocumentsFolder";
import DocumentsSlider from "./components/Pages/About/Documents/DocumentsSlider/DocumentsSlider";
import CoachInfo from "./components/Pages/Catalogs/Catalog/Cards/CoachCard/CoachInfo/CoachInfo";
import JudgeInfo from "./components/Pages/Catalogs/Catalog/Cards/JudgeCard/JudgeInfo/JudgeInfo";
import ClubInfo from "./components/Pages/Catalogs/Catalog/Cards/ClubCard/ClubInfo/ClubInfo";
import Management from "./components/Pages/About/Management/Management";
import EventInfo from "./components/Pages/Calendar/EventInfo/EventInfo";
import Catalog from "./components/Pages/Catalogs/Catalog/Catalog";
import Contacts from "./components/Pages/About/Contacts/Contacts";
import NewsInfo from "./components/Pages/News/NewsInfo/NewsInfo";
import Calendar from "./components/Pages/Calendar/Calendar";
import Feedback from "./components/Pages/Feedback/Feedback";
import NotFound from "./components/Pages/NotFound/NotFound";
import Catalogs from "./components/Pages/Catalogs/Catalogs";
import Logos from "./components/Pages/About/Logos/Logos";
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
        <Route exact path="/catalogs/coaches/:coachId">
          <CoachInfo />
        </Route>
        <Route exact path="/catalogs/dancers/:dancerId">
          <DancerInfo />
        </Route>
        <Route exact path="/catalogs/clubs/:clubId">
          <ClubInfo />
        </Route>
        <Route exact path="/catalogs/judges/:judgeId">
          <JudgeInfo />
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
        <Route exact path="/logos">
          <Logos />
        </Route>
        <Route exact path="/management">
          <Management />
        </Route>
        <Route exact path="/documents">
          <DocumentsFolder />
        </Route>
        <Route exact path="/documents/:documentsType">
          <DocumentsSlider />
        </Route>
        <Route exact path="/contacts">
          <Contacts />
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
