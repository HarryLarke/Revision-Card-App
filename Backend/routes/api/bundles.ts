import express from 'express'
import { getAllBundles, createNewBundle, updateBundle, deleteBundle, getBundle } from '../../controllers/bundleController'

const router = express.Router()

router.route('/')
    .get(getAllBundles)
    .post(createNewBundle)
    .put(updateBundle)
    .delete(deleteBundle)

router.route('/:id')
    .get(getBundle)

export default router