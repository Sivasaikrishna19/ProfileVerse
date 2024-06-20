
import { configureStore } from '@reduxjs/toolkit';
import profileSummaryReducer from './slices/profileSummary';

const store = configureStore({
  reducer: {
    profileSummary: profileSummaryReducer,
  },
});

export default store;


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
