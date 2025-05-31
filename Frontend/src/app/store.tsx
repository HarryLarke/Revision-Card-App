import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from '../features/api/apiSlice'

import uiReducer from '../features/ui/uiSlice'


export const store = configureStore({
  reducer: {
    ui: uiReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
   apiSlice.middleware

    ),
});

//Will need to sort out Slices?