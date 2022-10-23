import { configureStore } from '@reduxjs/toolkit';
import { newsApi } from '../services/api/news.api';
import newsUISlice from './ui/news-ui.slice';

const apiReducers = {
  [newsApi.reducerPath]: newsApi.reducer,
};

const rootReducer = {
  ...apiReducers,
  newsUI: newsUISlice,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(newsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
