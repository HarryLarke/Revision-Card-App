import type { Card, NewCard, UpdatedCard } from '../../types/cards'
import { apiCardsSlice } from '../api/apiSlice' 

export const extendedApiCardsSlice = apiCardsSlice.injectEndpoints({
    endpoints: builder => ({
        getCards: builder.query<Card[], void>({
            query: () => '',
            transformResponse: (responseData: Card[]) => 
                responseData
                    .slice()
                    .sort(
                        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                    ),//Maybe put an orderer at the top??? 
            providesTags: (result: Card[] | undefined) => result ? [
                {type: 'Card', id: 'LIST'},
                ...result.map((card: Card) => ({type: 'Card' as const, id: card._id}))
            ]
                : [{type: 'Card', id:'LIST'}],
        }),
        //Might be able to add an filter option post query?
        getCardById: builder.query<Card, string>({
            query: (id) => `/${id}`,
            transformResponse: (responseData: Card) => responseData, 
            providesTags: (result: Card | undefined) => [{type: 'Card', id: 'LIST'}] //Maybe change this... it's only for one card...
        }),

        getCardsByBundleId: builder.query<Card[], string>({
            query: (bundleId) => `/bundles/${bundleId}`,
            transformResponse: (responseData: Card[]) => responseData
            .slice()
            .sort(
                (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            ),
            providesTags: (result: Card[] | undefined) => result ? [
                {type: 'Card', id: 'LIST'},
                ...result.map((card: Card) => ({type: 'Card' as const, id: card._id}))
            ]
                : [{type: 'Card', id:'LIST'}],
        }),
        //I think having these variable is good, just because It does not require both just one?
        //need get cards via parent bundle id! 
        //Handling the id's the Tags worries me a bit?

        addCard: builder.mutation<Card, {_id: string, newCard: NewCard}>({
            query: ({newCard}) => ({
                url: '',
                method: 'POST',
                body: newCard
            }),
            invalidatesTags:  (result, error, {_id}) => [{type: 'Card', id: _id}, {type: 'Card', id:'LIST'}]
        }), //Where is this ID coming from??

        deleteCard: builder.mutation<void, string>({
            query: (_id) => ({
                url: `/${_id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, _id) => [{type: 'Card', _id}, {type: 'Card', id:'LIST'}]
        }),

        updatedCard: builder.mutation<Card, {_id: string, updatedCard: UpdatedCard}>({
            query: ({updatedCard, _id}) => ({
                url: `/${_id}`,
                method: 'PUT',
                body: updatedCard
            }),
            invalidatesTags: (result, error, {_id}) => [{type: 'Card', id:_id}, {type: 'Card', id:'LIST'}]        
        })
    })
})

export const { 
   useGetCardsQuery, 
   useGetCardByIdQuery,
   useGetCardsByBundleIdQuery,
   useAddCardMutation,
   useDeleteCardMutation,
   useUpdatedCardMutation
} = extendedApiCardsSlice


//We will need get by ID query too! - important to get the application works as efficiently and optimately as possible!!
//optimistic updates??
