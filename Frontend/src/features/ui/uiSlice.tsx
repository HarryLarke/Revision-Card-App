import { createSlice} from "@reduxjs/toolkit";

import type { UIState, Card } from "../../types/ui";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: UIState = {
    selectedBundleTitle: null,
    selectedCard: null 
}

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setSelectedBundleTitle(state, action:PayloadAction<string | null>) {
            state.selectedBundleTitle = action.payload
        },
        setSelectedCard(state, action:PayloadAction<Card | null>) {
            state.selectedCard = action.payload
        },
        clearSelections(state) {
            state.selectedBundleTitle = null
            state.selectedCard = null
        }
    }
})

export const {
    setSelectedBundleTitle,
    setSelectedCard,
    clearSelections
} = uiSlice.actions 

export default uiSlice.reducer
