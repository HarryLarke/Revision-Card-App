import express from 'express'
import { getAllCards, createNewCard, updateCard, deleteCard, getCard, getCardsbyBundleId  } from '../../controllers/cardController'

const router = express.Router()

router.route('/')
    .get(getAllCards)
    .post(createNewCard)
    .put(updateCard)
    .delete(deleteCard)

router.route('/:id')
    .get(getCard)

router.route('/bundles/:bundleId')
    .get(getCardsbyBundleId)

export default router