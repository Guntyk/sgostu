import { applyMiddleware, combineReducers, createStore } from "redux";
import { organizationsReducer } from "./organizations/reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { articlesReducer } from "./articles/reducer";
import { statusesReducer } from "./statuses/reducer";
import { classesReducer } from "./classes/reducer";
import { coachesReducer } from "./coaches/reducer";
import { dancersReducer } from "./dancers/reducer";
import { eventsReducer } from "./events/reducer";
import { clubsReducer } from "./clubs/reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  organizations: organizationsReducer,
  articles: articlesReducer,
  statuses: statusesReducer,
  classes: classesReducer,
  coaches: coachesReducer,
  dancers: dancersReducer,
  events: eventsReducer,
  clubs: clubsReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
