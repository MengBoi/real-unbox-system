const express = require('express');
const router = express.Router();
const {
  sendMessage
} = require('./../controllers/telegramController');

router.get('/sendMessage', sendMessage);

module.exports = router;
