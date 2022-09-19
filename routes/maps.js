const express = require('express');
const router = express.Router();
const {
    getAllMap,
    createMap,
    deleteMap
} = require('../controllers/maps');

router.route('/').get(getAllMap).post(createMap);
router.route('/:id').delete(deleteMap);

module.exports = router;