const express = require('express');
const router = express.Router();
const { getPhotographyPortfolio } = require('./../controllers/photographyPortfolioController');

router.get('/photo/index', getPhotographyPortfolio);

module.exports = router;
