const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  type: { // 類別
    type: String,
  },
  orderId: { // 訂單號
    type: String,
  },
  income: { // 收入
    type: Number,
    required: true
  },
  expend: { // 支出
    type: Number,
    required: true
  },
  cash: { // 餘額
    type: Number,
    required: true
  },
  remark: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);