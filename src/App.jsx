import Calendar from "./components/Pages/Calendar/Calendar";
import Contacts from "./components/Pages/Contacts/Contacts";
import Feedback from "./components/Pages/Feedback/Feedback";
import NotFound from "./components/Pages/NotFound/NotFound";
import { Route, Switch } from "react-router-dom";
import Header from "./components/Header/Header";
import Loader from "./components/Loader/Loader";
import Footer from "./components/Footer/Footer";
import Main from "./components/Pages/Main/Main";
import { useEffect } from "react";

export default function App() {
  // useEffect(() => {
  //   axios.post(
  //     "https://api.telegram.org/bot5603004166:AAFen05We0DnU5I5p5xcdENooDn-MRBYlxQ/sendMessage",
  //     {
  //       chat_id: 904054855,
  //       text: `На сайте новый пользователь`,
  //     }
  //   );
  // }, []);
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/">
          <Loader />
          <Main />
        </Route>
        <Route exact path="/calendar">
          <Loader />
          <Calendar />
        </Route>
        <Route exact path="/contacts">
          <Contacts />
        </Route>
        <Route exact path="/feedback">
          <Feedback />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}
