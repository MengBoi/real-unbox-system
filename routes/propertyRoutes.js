const express = require('express');
const { adminProtected } = require('./../middleware/authMiddleware');
const router = express.Router();
const {
  getProperties,
  getFeaturedProperties,
  createProperty,
  deleteProperty,
  getProperty,
  updateProperty
} = require('./../controllers/propertyController');

router.get('/index', getProperties);
router.get('/featured', getFeaturedProperties);
router.post('/create', createProperty);
router.post('/delete', deleteProperty);
router.get('/detail',getProperty);
router.post('/update',updateProperty);

module.exports = router;
