import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500'}),
    tagTypes: ['Bundle', 'Card'],
    endpoints: builder => ({})
})




//Hopefully with this don't have to worry about repeating myself with cards and bundles?
//Auth api here too?