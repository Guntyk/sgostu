import { newsObj, eventsObj, announcementsObj } from "./data";
import { BrowserRouter } from "react-router-dom";
import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import App from "./App";
import "./index.css";

export const Context = createContext(null);

const announcements = JSON.parse(announcementsObj);
const events = JSON.parse(eventsObj);
const news = JSON.parse(newsObj);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Context.Provider value={{ events, news, announcements }}>
      <Provider store={store}>
        <App />
      </Provider>
    </Context.Provider>
  </BrowserRouter>
);
