import { apiBundlesSlice } from '../api/apiSlice' 
import type { Bundle, NewBundle, UpdatedBundle } from '../../types/bundles'

export const extendedApiBundlesSlice = apiBundlesSlice.injectEndpoints({
    endpoints: builder => ({
        getBundles: builder.query<Bundle [], void>({
            query: () => '',
            transformResponse: (responseData: Bundle[]) => 
                responseData
                .slice()
                .sort(
                    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                )
            , 
            providesTags: (result: Bundle []| undefined) => result ? [
                {type: 'Bundle', id:'LIST'},
                ...result.map((bundle) => ({type:'Bundle' as const, id: bundle._id}))]
                : [{type: 'Bundle', id:'LIST'}]
        }),

        addBundle: builder.mutation<Bundle, {_id: string, newBundle: NewBundle}>({
            query: ({newBundle}) => ({
                url: '',
                method: 'POST',
                body: newBundle
            }),
            invalidatesTags: (result, error, {_id}) => [{type: 'Bundle', id: _id}, {type: 'Bundle', id:'LIST'}]
        }),

        deleteBundle: builder.mutation<void, string>({
            query: (_id) => ({
                url: `/${_id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, _id) => [{type: 'Bundle', id:_id}, {type: 'Bundle', id:'LIST'}]
        }),

        updatedBundle: builder.mutation<Bundle, {_id: string, updatedBundle: UpdatedBundle}>({
            query: ({updatedBundle, _id}) => ({
                url: `/${_id}`,
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
