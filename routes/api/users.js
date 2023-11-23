const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys.js');
const passport = require('passport');
const User = require('../../models/User');


// $route   GET api/users/test
// @dsc     返回請求的json資料
// @access  Public
router.get('/test', (req, res) => {
  res.json({ msg: 'ok' })
});

// $route   POST api/users/register
// @dsc     返回請求的json資料
// @access  Public
router.post('/register', (req, res) => {

  // 查詢資料庫是否有email
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        return res.json({
          msg: 'email 已註冊',
          success: false
        })
      }
      else {
        // s: size; r: rating; pg表示圖片格式; d: undefaulat以404表示, mm表示當沒有圖像時以預設圖表示
        const avatart = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});

        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatart,
          password: req.body.password,
          identity: req.body.identity
        })

        // 加密
        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            // Store hash in your password DB.
            if(err) throw err;

            newUser.password = hash;
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err))
          });
      });

      }
    })
});

// $route   POST api/users/login
// @dsc     返回token jwt passport
// @access  Public
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  User.findOne({email})
    .then(user => {
      if (!user) {
        return res.json({
          success: false,
          msg: 'Email錯誤！'
        })
      }

      // 確認密碼
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            // jwt.sign(帶入規則、加密、過期時間、callback)
            const { id, name, avatart, identity } = user;
            const rule = { id, name, avatart, identity };

            jwt.sign(rule, keys.secretOrKey, {expiresIn: '1h'}, (err, token) => {
              console.log(err)
              if (err) throw err;
              res.json({
                success: true,
                token: 'Bearer ' + token
              });
            });
          }
          else {
            return res.json({
              success: false,
              msg: '密碼或帳號錯誤'
            });
          }
        });
    })
});

// $route   GET api/users/current
// @dsc     驗證token返回current user
// @access  Private
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    identity: req.user.identity
  })
})


// $route   POST api/users/
// @dsc     取得users全部資料
// @access  Private
router.get('/all', passport.authenticate('jwt', { session: false }), (req, res) => {
  // 查詢資料
  User.find()
    .then(user => {
      if (!user) {
        return res.status(404).json({
          success: false,
          msg: '查無資料'
        });
      }
      const date = user.filter(u => u.identity === 'employee').map(e => {
        return {
          id: e.id,
          name: e.name,
          email: e.email,
          avatart: e.avatart,
          identity: e.identity
        }
      })

      res.json(date);
    })
    .catch(err => {
      console.log(err);
      res.status(404).json({
        success: false,
        ...err
      })
    });
});

router.get('/checkToken', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ msg: 'success' })
});

module.exports = router;