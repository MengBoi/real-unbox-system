const express = require('express');
const router = express.Router();
const { getZones } = require('./../controllers/locationController');

router.get('/zone/index', getZones);

module.exports = router;
