import { createSlice} from "@reduxjs/toolkit";

import type { UIState, Bundle, Card } from "../../types/ui";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: UIState = {
    selectedBundle: null,
    selectedCard: null 
}

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setSelectedBundle(state, action:PayloadAction<Bundle | null>) {
            state.selectedBundle = action.payload
        },
        setSelectedCard(state, action:PayloadAction<Card | null>) {
            state.selectedCard = action.payload
        },
        clearSelections(state) {
            state.selectedBundle = null
            state.selectedCard = null
        }
    }
})

export const {
    setSelectedBundle,
    setSelectedCard,
    clearSelections
} = uiSlice.actions 

export default uiSlice.reducer
