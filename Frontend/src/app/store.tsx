import { configureStore } from "@reduxjs/toolkit";
import { extendedApiCardsSlice } from "../features/cards/cardsSlice";
import { extendedApiBundlesSlice } from "../features/bundles/bundlesSlice";

export const store = configureStore({
  reducer: {
    [extendedApiBundlesSlice.reducerPath]: extendedApiBundlesSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      extendedApiBundlesSlice.middleware
    ),
});

//Will need to sort out Slices?