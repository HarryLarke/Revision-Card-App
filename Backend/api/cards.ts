import express from 'express'
import { getAllCards, createNewCard, updateCard, deleteCard, getCard  } from '../source/controllers/cardController'

const router = express.Router()

router.route('/')
    .get(getAllCards)
    .post(createNewCard)
    .put(updateCard)
    .delete(deleteCard)

router.route('/:id')
    .get(getCard)

export default router