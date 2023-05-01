import { applyMiddleware, combineReducers, createStore } from "redux";
import { dancerClassesReducer } from "./dancerClasses/reducer";
import { documentTypesReducer } from "./documentTypes/reducer";
import { organizationsReducer } from "./organizations/reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { judgeClassesReducer } from "./judgeClasses/reducer";
import { managementReducer } from "./management/reducer";
import { documentsReducer } from "./documents/reducer";
import { articlesReducer } from "./articles/reducer";
import { statusesReducer } from "./statuses/reducer";
import { coachesReducer } from "./coaches/reducer";
import { dancersReducer } from "./dancers/reducer";
import { regionsReducer } from "./regions/reducer";
import { eventsReducer } from "./events/reducer";
import { judgesReducer } from "./judges/reducer";
import { clubsReducer } from "./clubs/reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  dancerClasses: dancerClassesReducer,
  documentTypes: documentTypesReducer,
  organizations: organizationsReducer,
  judgeClasses: judgeClassesReducer,
  management: managementReducer,
  documents: documentsReducer,
  articles: articlesReducer,
  statuses: statusesReducer,
  coaches: coachesReducer,
  dancers: dancersReducer,
  regions: regionsReducer,
  events: eventsReducer,
  judges: judgesReducer,
  clubs: clubsReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
