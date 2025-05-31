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

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
//Export above, export the varying types  of data - handy for my UI stuff!
//Will need to sort out Slices?
