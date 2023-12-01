const express = require('express');
const router = express.Router();
const passport = require('passport');
const Product = require('../../models/Product');

// $route   GET api/products/test
// @dsc     返回請求的json資料
// @access  Public
router.get('/test', (req, res) => {
  res.json({ msg: 'products ok' })
});

// $route   POST api/products/add
// @dsc     建立products
// @access  Private
router.post('/add', passport.authenticate('jwt', {session: false}), (req, res) => {
  const productsFields = {};

  if (req.body.type !== undefined) productsFields.type = req.body.type;
  if (req.body.status !== undefined) productsFields.status = req.body.status;
  if (req.body.name !== undefined) productsFields.name = req.body.name;
  if (req.body.describe !== undefined) productsFields.describe = req.body.describe;
  if (req.body.cost !== undefined) productsFields.cost = req.body.cost;
  if (req.body.retail !== undefined) productsFields.retail = req.body.retail;
  if (req.body.discount !== undefined) productsFields.discount = req.body.discount;
  if (req.body.directions !== undefined) productsFields.directions = req.body.directions;
  if (req.body.preserve !== undefined) productsFields.preserve = req.body.preserve;
  if (req.body.weight !== undefined) productsFields.weight = req.body.weight;
  if (req.body.ingredient !== undefined) productsFields.ingredient = req.body.ingredient;
  if (req.body.nutritionFacts !== undefined) productsFields.nutritionFacts = req.body.nutritionFacts;
  if (req.body.exp !== undefined) productsFields.exp = req.body.exp;
  if (req.body.img !== undefined) productsFields.img = req.body.img;
  if (req.body.popular !== undefined) productsFields.popular = req.body.popular;
  if (req.body.style !== undefined) productsFields.style = req.body.style;
  if (req.body.order !== undefined) productsFields.order = req.body.order;
  if (req.body.remark !== undefined) productsFields.remark = req.body.remark;
  if (req.body.date !== undefined) productsFields.date = req.body.date;
  

  // 儲存至DB
  new Product(productsFields).save()
    .then(products => {
      res.json(products)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        success: false,
        ...err
      })
    });
});


// $route   POST api/products/edit/:id
// @dsc     編輯products
// @access  Private
router.post('/edit/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  const productsFields = {};

  if (req.body.type !== undefined) productsFields.type = req.body.type;
  if (req.body.status !== undefined) productsFields.status = req.body.status;
  if (req.body.name !== undefined) productsFields.name = req.body.name;
  if (req.body.describe !== undefined) productsFields.describe = req.body.describe;
  if (req.body.cost !== undefined) productsFields.cost = req.body.cost;
  if (req.body.retail !== undefined) productsFields.retail = req.body.retail;
  if (req.body.discount !== undefined) productsFields.discount = req.body.discount;
  if (req.body.directions !== undefined) productsFields.directions = req.body.directions;
  if (req.body.preserve !== undefined) productsFields.preserve = req.body.preserve;
  if (req.body.weight !== undefined) productsFields.weight = req.body.weight;
  if (req.body.ingredient !== undefined) productsFields.ingredient = req.body.ingredient;
  if (req.body.nutritionFacts !== undefined) productsFields.nutritionFacts = req.body.nutritionFacts;
  if (req.body.exp !== undefined) productsFields.exp = req.body.exp;
  if (req.body.img !== undefined) productsFields.img = req.body.img;
  if (req.body.popular !== undefined) productsFields.popular = req.body.popular;
  if (req.body.style !== undefined) productsFields.style = req.body.style;
  if (req.body.order !== undefined) productsFields.order = req.body.order;
  if (req.body.remark !== undefined) productsFields.remark = req.body.remark;
  if (req.body.date !== undefined) productsFields.date = req.body.date;

  // 更新至DB(id, 新資料, new: true)
  Product.findOneAndUpdate(
    { _id: req.params.id },
    { $set: productsFields },
    { new: true }
  )
    .then(product => {
      res.json(product)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        success: false,
        ...err
      })
    });
});


// $route   DELETE api/products/delete/:id
// @dsc     刪除products
// @access  Private
router.delete('/delete/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  Product.findOneAndRemove({ _id: req.params.id })
    .then(() => { // 只有刪除的then沒有參數～！！
      res.json({ success: true });
    })
    .catch(err => {
      res.status(404).json({ success: false, msg: 刪除失敗 });
    });
});


// $route   POST api/products/
// @dsc     取得products全部資料
// @access  Public
router.get('/', (req, res) => {
  // 查詢資料
  Product.find()
    .then(product => {
      if (!product) {
        return res.status(404).json({
          success: false,
          msg: '查無資料'
        });
      }
      res.json(product);
    })
    .catch(err => {
      console.log(err);
      res.status(404).json({
        success: false,
        ...err
      })
    });
});

module.exports = router;