import { apiBundlesSlice } from '../api/apiSlice' 

interface bundle {
    title: string, 
    description: string,
    timeDate: string,
    _id: string
}

interface loadedBundles {
    bundles: bundle[]
}

export const extendedApiBundlesSlice = apiBundlesSlice.injectEndpoints({
    endpoints: builder => ({
        getBundles: builder.query({
            query: () => '',
            transformResponse: responseData => {
                const loadedBundles = responseData.map(item => {
                    return item
                })
                return loadedBundles 
                //Will find a method to organise timeDate order. 
                //Maybe implement setting to vary how these are ordered i.e. alphabetical order etc.
            }, //Make sure IDs are chill and matching...
            providesTags: (result, error, arg) => [
                {type: 'Bundle', id: 'DISPLAY'},
                result.ids.map(id => ({type:'Bundle', id}))
            ]
        }),
        //I think having these variable is good, just because It does not require both just one?

        addBundle: builder.mutation({
            query: (newBundle) => ({
                url: '',
                method: 'POST',
                body: {
                    title: newBundle?.title,
                    description: newBundle?.description
                }
            }),
            invalidatesTags: [{type: 'Bundle', id: 'DISPLAY'}]
        }),

        deleteBundle: builder.mutation({
            query: ({id}) => ({
                url: `/${id}`,
                method: 'DELETE',
                body: {id}
            }),
            invalidatesTags: (result, error, arg) => [{type: 'Bundle', id: arg.id }]
        }),

        updatedBundle: builder.mutation({
            query: (updatedBundle) => ({
                url: `/${updatedBundle.id}`,
                method: 'PUT',
                body: {
                    title: updatedBundle?.title,
                    description: updatedBundle?.description
                }
            }),
            invalidatesTags: (result, error, arg) => [{type: 'Bundle', id: arg.id }]        
        })
    })
})

export const {
    useGetBundlesQuery,
    useAddBundleMutation,
    useDeleteBundleMutation,
    useUpdateBundleMutation
} = extendedApiBundlesSlice

//We will need get by ID query too! - important to get the application works as efficiently and optimately as possible!!
//optimistic updates??
