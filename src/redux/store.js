import { applyMiddleware, combineReducers, createStore } from "redux";
import { dancerClassesReducer } from "./dancerClasses/reducer";
import { organizationsReducer } from "./organizations/reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { articlesReducer } from "./articles/reducer";
import { statusesReducer } from "./statuses/reducer";
import { coachesReducer } from "./coaches/reducer";
import { dancersReducer } from "./dancers/reducer";
import { eventsReducer } from "./events/reducer";
import { judgesReducer } from "./judges/reducer";
import { clubsReducer } from "./clubs/reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  organizations: organizationsReducer,
  classes: dancerClassesReducer,
  articles: articlesReducer,
  statuses: statusesReducer,
  coaches: coachesReducer,
  dancers: dancersReducer,
  events: eventsReducer,
  judges: judgesReducer,
  clubs: clubsReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
