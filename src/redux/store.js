import { configureStore } from '@reduxjs/toolkit';
import { documentTypesReducer } from 'redux/documentTypes/reducer';
import { organizationsReducer } from 'redux/organizations/reducer';
import { managementReducer } from 'redux/management/reducer';
import { documentsReducer } from 'redux/documents/reducer';
import statusesReducer from 'redux/features/statusesSlice';
import { articlesReducer } from 'redux/articles/reducer';
import coachesReducer from 'redux/features/coachesSlice';
import dancersReducer from 'redux/features/dancersSlice';
import judgesReducer from 'redux/features/judgesSlice';
import { eventsReducer } from 'redux/events/reducer';
import clubsReducer from 'redux/features/clubsSlice';

const store = configureStore({
  reducer: {
    documentTypes: documentTypesReducer,
    organizations: organizationsReducer,
    management: managementReducer,
    documents: documentsReducer,
    statuses: statusesReducer,
    articles: articlesReducer,
    coaches: coachesReducer,
    dancers: dancersReducer,
    events: eventsReducer,
    judges: judgesReducer,
    clubs: clubsReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
    }),
});

export default store;
