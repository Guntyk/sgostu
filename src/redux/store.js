import { configureStore } from '@reduxjs/toolkit';
import statusesReducer from 'redux/features/statusesSlice';
import dancersReducer from 'redux/features/dancersSlice';

const store = configureStore({
  reducer: {
    dancers: dancersReducer,
    statuses: statusesReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
    }),
});

export default store;
