const express = require('express');
const router = express.Router();
const { getHomeInfo } = require('./../controllers/homeController');

router.get('/index', getHomeInfo);

module.exports = router;
