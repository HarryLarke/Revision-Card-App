
export interface Card {
   question: string,
   answer: string 
}

export interface Bundle {
    title: string, 
    description: string
}

export interface UIState {
    selectedBundle: Bundle | null,
    selectedCard: Card | null
}