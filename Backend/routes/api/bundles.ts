import express from 'express'
import { getAllBundles, createNewBundle } from '../../controllers/bundleController'

const router = express.Router()

router.route('/')
    .get(getAllBundles)
    .post(createNewBundle)

export default router