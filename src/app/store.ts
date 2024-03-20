import { configureStore } from '@reduxjs/toolkit';

import { geoCodeApi, weatherApi } from './baseApi';
import locationSlice from './locationSlice';
import mapSlice from './mapSlice';

export const store = configureStore({
  reducer: {
    location: locationSlice,
    isMap: mapSlice,
    [weatherApi.reducerPath]: weatherApi.reducer,
    [geoCodeApi.reducerPath]: geoCodeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(weatherApi.middleware)
      .concat(geoCodeApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
