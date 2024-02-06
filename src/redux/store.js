import { configureStore } from '@reduxjs/toolkit';
import statusesReducer from 'redux/features/statusesSlice';
import coachesReducer from 'redux/features/coachesSlice';
import dancersReducer from 'redux/features/dancersSlice';
import judgesReducer from 'redux/features/judgesSlice';
import clubsReducer from 'redux/features/clubsSlice';

const store = configureStore({
  reducer: {
    statuses: statusesReducer,
    coaches: coachesReducer,
    dancers: dancersReducer,
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
