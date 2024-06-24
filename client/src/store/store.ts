
import { configureStore } from '@reduxjs/toolkit';
import profileSummaryReducer from './slices/profileSummary';
import authentication from './slices/authentication';

const store = configureStore({
  reducer: {
    profileSummary: profileSummaryReducer,
    authentication:authentication,
  },
});

export default store;


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
