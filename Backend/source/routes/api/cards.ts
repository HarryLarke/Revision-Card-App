import express from 'express'
import { getAllCards, createNewCard, updateCard, deleteCard, getCard, getCardsbyBundleId  } from '../../controllers/cardController'

const router = express.Router()

router.route('/')
    .get(getAllCards)
    .post(createNewCard)
    .delete(deleteCard)
    

router.route('/:id')
    .get(getCard)
    .put(updateCard)

router.route('/bundles/:id')
    .get(getCardsbyBundleId)

export default router