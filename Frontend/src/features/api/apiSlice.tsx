import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const apiBundlesSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://localhost:3500/bundles'}),
    tagTypes: ['BUNDLE'],
    endpoints: builder => ({})
})

export const apiCardsSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500/cards'}),
    tagTypes: ['CARD'],
    endpoints: builder => ({})
})

//Hopefully with this don't have to worry about repeating myself with cards and bundles?