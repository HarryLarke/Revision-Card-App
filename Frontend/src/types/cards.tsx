export interface Card {
    parentBundle: string, //ObjectId
    _id: string,
    question: string, 
    answer: string,
    createdAt: Date,
    updatedAt: Date
}

export interface NewCard {
    parentBundle: string,
    question: string, 
    answer: string
}

export interface UpdatedCard {
    parentBundle: string,
    question: string, 
    answer: string
}

