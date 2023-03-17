import { applyMiddleware, combineReducers, createStore } from "redux";
import { organizationsReducer } from "./organizations/reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { dancersReducer } from "./dancers/reducer";
import { eventsReducer } from "./events/reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  organizations: organizationsReducer,
  dancers: dancersReducer,
  events: eventsReducer
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
