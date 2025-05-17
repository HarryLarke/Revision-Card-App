import { configureStore } from "@reduxjs/toolkit";
import { extendedApiCardsSlice } from "../features/cards/cardsSlice";
import { extendedApiBundlesSlice } from "../features/bundles/bundlesSlice";


export const store = configureStore({
    reducer: {
        [extendedApiCardsSlice.reducerPath]: extendedApiCardsSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(extendedApiCardsSlice.middleware)
})

//Will need to sort out Slices?