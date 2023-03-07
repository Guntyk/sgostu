import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { dancersReducer } from "./dancers/reducer";
import { eventsReducer } from "./events/reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  events: eventsReducer,
  dancers: dancersReducer
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
