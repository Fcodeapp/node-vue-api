const express = require('express');
const router = express.Router();
const passport = require('passport');
const Profile = require('../../models/Profile');


// // $route   GET api/profiles/test
// // @dsc     返回請求的json資料
// // @access  Public
// router.get('/test', (req, res) => {
//   res.json({ msg: 'profile ok' })
// });


// $route   POST api/profiles/add
// @dsc     建立profiles
// @access  Private
router.post('/add', passport.authenticate('jwt', {session: false}), (req, res) => {
  const profileFields = {};

  if (req.body.type !== undefined) profileFields.type = req.body.type;
  if (req.body.orderId !== undefined) profileFields.orderId = req.body.orderId;
  if (req.body.income !== undefined) profileFields.income = req.body.income;
  if (req.body.expend !== undefined) profileFields.expend = req.body.expend;
  if (req.body.cash !== undefined) profileFields.cash = req.body.cash;
  if (req.body.remark !== undefined) profileFields.remark = req.body.remark;
  if (req.body.date !== undefined) profileFields.date = req.body.date;

  // 儲存至DB
  new Profile(profileFields).save()
    .then(profile => {
      res.json(profile)
    })
});


// $route   POST api/profiles/edit/:id
// @dsc     編輯profiles
// @access  Private
router.post('/edit/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  const profileFields = {};

  if (req.body.type !== undefined) profileFields.type = req.body.type;
  if (req.body.orderId !== undefined) profileFields.orderId = req.body.orderId;
  if (req.body.income !== undefined) profileFields.income = req.body.income;
  if (req.body.expend !== undefined) profileFields.expend = req.body.expend;
  if (req.body.cash !== undefined) profileFields.cash = req.body.cash;
  if (req.body.remark !== undefined) profileFields.remark = req.body.remark;
  if (req.body.date !== undefined) profileFields.date = req.body.date;

  // 更新至DB(id, 新資料, new: true)
  Profile.findOneAndUpdate(
    { _id: req.params.id },
    { $set: profileFields },
    { new: true }
  )
    .then(profile => {
      res.json(profile)
    })
});


// $route   DELETE api/profiles/delete/:id
// @dsc     刪除profiles
// @access  Private
router.delete('/delete/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  Profile.findOneAndRemove({ _id: req.params.id })
    .then(() => { // 只有刪除的then沒有參數～！！
      res.json({ success: true });
    })
    .catch(err => {
      res.status(404).json({ success: false, msg: 刪除失敗 });
    });
});

// $route   POST api/profiles/
// @dsc     取得profiles全部資料
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  // 查詢資料
  Profile.find()
    .then(profile => {
      if (!profile) {
        return res.status(404).json({
          success: false,
          msg: '查無資料'
        });
      }
      console.log(profile)
      res.json(profile);
    })
    .catch(err => {
      console.log(err);
      res.status(404).json({
        success: false,
        ...err
      })
    });
});


// $route   POST api/profiles/:id
// @dsc     取得profiles單一筆資料
// @access  Private
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  // 查詢資料
  Profile.findOne({_id: req.params.id})
    .then(profile => {
      if (!profile) {
        return res.status(404).json({msg: '查無資料'});
      }

      res.json(profile);
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