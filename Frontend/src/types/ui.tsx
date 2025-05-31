
export interface Card {
    parentBundle: string, //Don't know if I will need a parent bundle 
   question: string,
   answer: string 
}

export interface UIState {
    selectedBundleTitle: string | null,
    selectedCard: Card | null
}