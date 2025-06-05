import express from 'express'
import { getAllBundles, createNewBundle, updateBundle, deleteBundle, getBundle } from '../../controllers/bundleController'

const router = express.Router()

router.route('/')
    .get(getAllBundles)
    .post(createNewBundle)
   

router.route('/:id')
    .get(getBundle)
    .put(updateBundle)
    .delete(deleteBundle)

export default router