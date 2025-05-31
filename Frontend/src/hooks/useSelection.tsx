import { useSelector, useDispatch } from "react-redux"; 

import type { RootState, AppDispatch } from "../app/store"
import type { Card } from '../types/ui'

import {
    setSelectedBundleTitle,
    setSelectedCard
} from '../features/ui/uiSlice'

export const useSelection = () => {
    const dispatch = useDispatch<AppDispatch>()

    const selectedBundleTitle = useSelector((state: RootState) => state.ui.selectedBundleTitle)
    const selectedCard = useSelector((state: RootState) => state.ui.selectedCard) 

    const setBundleTitle = (title: string | null) => {
        dispatch(setSelectedBundleTitle(title))
    }

    const setCard = (card: Card | null) => {
        dispatch(setSelectedCard(card))
    }

    return {
    selectedBundleTitle,
    selectedCard,
    
    setBundleTitle,
    setCard
}

}


