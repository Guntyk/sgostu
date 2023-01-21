import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import React, { createContext } from "react";
import App from "./App";
import "./index.css";
import { data } from "./data";

export const Context = createContext(null);

const events = JSON.parse(data);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Context.Provider value={{ events }}>
      <Provider store={store}>
        <App />
      </Provider>
    </Context.Provider>
  </BrowserRouter>
);
