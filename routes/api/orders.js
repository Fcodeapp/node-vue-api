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



// $route   POST api/orders/
// @dsc     取得orders全部資料
// @access  Public
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  // 查詢資料
  Orders.find()
    .then(order => {
      if (!order) {
        return res.status(404).json({
          success: false,
          msg: '查無資料'
        });
      }
      res.json(order);
    })
    .catch(err => {
      console.log(err);
      res.status(404).json({
        success: false,
        ...err
      })
    });
});

// $route   POST api/orders/add
// @dsc     建立products
// @access  Public
router.post('/add', (req, res) => {
  const ordersFields = {};

  console.log(req.body)

  if (req.body.payment !== undefined) ordersFields.payment = req.body.payment;
  if (req.body.pickup !== undefined) ordersFields.pickup = req.body.pickup;
  if (req.body.clientUserID !== undefined) ordersFields.clientUserID = req.body.clientUserID;
  if (req.body.name !== undefined) ordersFields.name = req.body.name;
  if (req.body.tel !== undefined) ordersFields.tel = req.body.tel;
  if (req.body.email !== undefined) ordersFields.email = req.body.email;
  if (req.body.address !== undefined) ordersFields.address = req.body.address;
  if (req.body.details !== undefined) ordersFields.details = req.body.details;
  if (req.body.totalAmount !== undefined) ordersFields.totalAmount = req.body.totalAmount;
  if (req.body.remark !== undefined) ordersFields.remark = req.body.remark;
  if (req.body.date !== undefined) ordersFields.date = req.body.date;
  

  // 儲存至DB
  new Orders(ordersFields).save()
    .then(orders => {
      res.json(orders)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        success: false,
        ...err
      })
    });
});

module.exports = router;