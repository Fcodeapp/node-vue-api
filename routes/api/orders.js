const express = require('express');
const router = express.Router();
const passport = require('passport');
const Orders = require('../../models/Order');

// $route   GET api/orders/test
// @dsc     返回請求的json資料
// @access  Public
router.get('/test', (req, res) => {
  res.json({ msg: 'orders ok' })
});

module.exports = router;