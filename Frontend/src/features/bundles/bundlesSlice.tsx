import { apiSlice } from '../api/apiSlice' 
import type { Bundle, NewBundle, UpdatedBundle } from '../../types/bundles'

export const extendedApiBundlesSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getBundles: builder.query<Bundle [], void>({
            query: () => '/bundles',
            transformResponse: (responseData: Bundle[]) => {
                if(responseData === null) return []
                console.log('Response Data:', responseData)
                    return responseData.slice().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            },
    
            providesTags: (result: Bundle []| undefined) => result ? [
                {type: 'Bundle', id:'LIST'},
                ...result.map((bundle) => ({type:'Bundle' as const, id: bundle._id}))]
                : [{type: 'Bundle', id:'LIST'}]
        }),

        addBundle: builder.mutation<Bundle, {title: string, description: string}>({
            query: (newBundle) => ({
                url: '/bundles',
                method: 'POST',
                body: newBundle
            }),
            invalidatesTags: (result, error) => [ {type: 'Bundle', id:'LIST'}]
        }),

        deleteBundle: builder.mutation<void, string>({
            query: (_id) => ({
                url: `/bundles/${_id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, _id) => [{type: 'Bundle', id:_id}, {type: 'Bundle', id:'LIST'}]
        }),

        updatedBundle: builder.mutation<Bundle, {_id: string, updatedBundle: UpdatedBundle}>({
            query: ({updatedBundle, _id}) => ({
                url: `/bundles/${_id}`,
                method: 'PUT',
                body: updatedBundle
            }),
            invalidatesTags: (result, error, {_id}) => [{type: 'Bundle', id: _id}, {type: 'Bundle', id: 'LIST'}]        
        })
    })
})

export const {
    useGetBundlesQuery,
    useAddBundleMutation,
    useDeleteBundleMutation,
    useUpdatedBundleMutation
} = extendedApiBundlesSlice

//We will need get by ID query too! - important to get the application works as efficiently and optimately as possible!!
//optimistic updates?? 

//Refractor with select by ID once up and working...
//Will need to get bund by ID for update bundle - probably better than adding a filter to the page 
