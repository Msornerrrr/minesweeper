import { Router } from 'express';
import { getAllMap, createMap, deleteMap } from '../controllers/maps.js';
import auth from '../middleware/authentication.js';

const router = Router();

router.route('/').get(getAllMap).post(/*auth, */createMap);
router.route('/:id').delete(/*auth, */deleteMap);

export default router;