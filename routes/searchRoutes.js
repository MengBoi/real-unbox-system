const express = require('express');
const { adminProtected } = require('./../middleware/authMiddleware');
const router = express.Router();
const {
  searchProperties,
} = require('./../controllers/searchController');

router.get('/property', searchProperties);

module.exports = router;
