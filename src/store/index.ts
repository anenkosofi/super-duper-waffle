import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { filtersReducer, FiltersState } from './filters/slice';
import { tweetsReducer, TweetsState } from './tweets/slice';

const filtersPersistConfig = {
  key: 'filters',
  storage,
};

const tweetsPersistConfig = {
  key: 'tweets',
  storage,
};

export const store = configureStore({
  reducer: {
    tweets: persistReducer<TweetsState>(tweetsPersistConfig, tweetsReducer),
    filters: persistReducer<FiltersState>(filtersPersistConfig, filtersReducer),
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
