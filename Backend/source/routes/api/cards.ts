import express from 'express'
import { getAllCards, createNewCard, updateCard, deleteCard, getCard, getCardsbyBundleId, deleteCardsByBundleId } from '../../controllers/cardController'

const router = express.Router()

router.route('/')
    .get(getAllCards)
    .post(createNewCard)
    
    

router.route('/:id')
    .get(getCard)
    .put(updateCard)
    .delete(deleteCard)

router.route('/bundles/:id')
    .get(getCardsbyBundleId)
    .delete(deleteCardsByBundleId)

export default router