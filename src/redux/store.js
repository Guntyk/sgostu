import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { eventsReducer } from "./events/reducer";
import thunk from "redux-thunk";

export const store = createStore(
  eventsReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
