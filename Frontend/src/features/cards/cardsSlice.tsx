import { apiCardsSlice } from '../api/apiSlice' 

interface card {
    question: string, 
    answer: string,
}

interface loadedCards {
    cards: card[]
}

export const extendedApiCardsSlice = apiCardsSlice.injectEndpoints({
    endpoints: builder => ({
        getCards: builder.query({
            query: () => '',
            transformResponse: responseData => {
                const loadedCards = responseData.map(item => {
                    return item
                })
                return loadedCards 
                //Find method to order cards - may variable control with the implmentation of settings later on.
            }, 
            providesTags: (result, error, arg) => [
                {type: 'Card', id: 'DISPLAY'},
                result.ids.map(id => ({type:'Card', id}))
            ]
        }),
        //Getting cards by ID - maybe set a route on the backend??
        //I think having these variable is good, just because It does not require both just one?
        //need get cards via parent bundle id! 
        addCard: builder.mutation({
            query: (newCard) => ({
                url: '',
                method: 'POST',
                body: {
                    question: newCard.question,
                    anwser: newCard.answer,
                    parentBundle: newCard.parentBundle
                }
            }),
            invalidatesTags: [{type: 'Card', id: 'DISPLAY'}]
        }),

        deleteCard: builder.mutation({
            query: ({id}) => ({
                url: `/${id}`,
                method: 'DELETE',
                body: {id}
            }),
            invalidatesTags: (result, error, arg) => [{type: 'Card', id: arg.id }]
        }),

        updatedCard: builder.mutation({
            query: (updatedBundle) => ({
                url: `/${updatedBundle.id}`,
                method: 'PUT',
                body: {
                    title: updatedBundle?.title,
                    description: updatedBundle?.description
                }
            }),
            invalidatesTags: (result, error, arg) => [{type: 'Card', id: arg.id }]        
        })
    })
})

export const { 
    useGetCardsQuery,
    useAddCardMutation,
    useDeleteCardMutation,
    useUpdateCardMutation
} = extendedApiCardsSlice


//We will need get by ID query too! - important to get the application works as efficiently and optimately as possible!!
//optimistic updates??
