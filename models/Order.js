const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const OrderSchema = new Schema({
  payment: { // 付款方式
    type: String,
  },
  pickup: { // 取貨方式
    type: String,
  },
  clientUserID: {
    type: String
  },
  name: { // 訂購者
    type: String,
  },
  email: {
    type: String
  },
  tel: { // 訂購者電話
    type: String,
    required: true
  },
  address: { // 訂購者地址
    type: String,
  },
  details: { // 訂購明細(ID, 品名, 單價, 數量)
    type: String,
    required: true
  },
  totalAmount: { // 總額
    type: Number,
  },
  remark: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Order = mongoose.model('order', OrderSchema);