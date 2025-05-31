import { useSelector, useDispatch } from "react-redux"; 

import type { RootState, AppDispatch } from "../app/store"
import type { Bundle, Card } from '../types/ui'

import {
    setSelectedBundle,
    setSelectedCard
} from '../features/ui/uiSlice'

//May devote this to UI Selection??
export const useSelection = () => {
    const dispatch = useDispatch<AppDispatch>()

    const selectedBundle = useSelector((state: RootState) => state.ui.selectedBundle)
    const selectedCard = useSelector((state: RootState) => state.ui.selectedCard) 

    const setBundle = (bundle : Bundle | null) => {
        dispatch(setSelectedBundle(bundle))
    }

    const setCard = (card: Card | null) => {
        dispatch(setSelectedCard(card))
    }

    return {
    selectedBundle,
    selectedCard,
    
    setBundle,
    setCard
}

}


