import { createSlice} from "@reduxjs/toolkit";

import type { UIState } from "../../types/ui";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: UIState = {
    selectedBundleTitle: null
}

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setSelectedBundleTitle(state, action:PayloadAction<string | null>) {
            state.selectedBundleTitle = action.payload
        },
        clearSelections(state) {
            state.selectedBundleTitle = null
        }
    }
})

export const {
    setSelectedBundleTitle,
    clearSelections
} = uiSlice.actions 

export default uiSlice.reducer

export const selectCurrentBundleTitle = (state) => state.ui.selectedBundleTitle