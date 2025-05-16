import { apiCardsSlice } from '../api/apiSlice' 

interface Card {
    parentBundle: string, //ObjectId
    _id: string,
    question: string, 
    answer: string,
    createdAt: Date,
    updatedAt: Date
}

interface NewCard {
    parentBundle: string,
    question: string, 
    answer: string
}

interface UpdatedCard {
    parentBundle: string,
    question: string, 
    answer: string
}


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
            providesTags: (result) => result ? [
                {type: 'Card', id: 'List'},
                ...result.map((card: Card) => ({type: 'Card', id: card._id}))
            ]
                : [{type: 'Card', id:'List'}],
        }),

        getCardsByBundleId: builder.query<Card[], string>({
            query: (bundleId: string) => `/bundles/${bundleId}`,
            transformResponse: (responseData: Card[]) => responseData
            .slice()
            .sort(
                (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            ),
            providesTags: (result) => result ? [
                {type: 'Card', id: 'List'},
                ...result.map((card: Card) => ({type: 'Card', id: card._id}))
            ]
                : [{type: 'Card', id:'List'}],
        }),
        //I think having these variable is good, just because It does not require both just one?
        //need get cards via parent bundle id! 
        addCard: builder.mutation<NewCard[], string>({
            query: (newCard: NewCard) => ({
                url: '',
                method: 'POST',
                body: {
                    parentBundle: newCard.parentBundle,
                    question: newCard.question,
                    anwser: newCard.answer
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
            query: (updatedCard) => ({
                url: `/${updatedCard.id}`,
                method: 'PUT',
                body: {
                    question: updatedCard?.question,
                    answer: updatedCard?.answer
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
