const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const OrderSchema = new Schema({
  type: {
    type: String,
  },
  name: { // 訂購者
    type: String,
  },
  tel: { // 訂購者電話
    type: String,
    required: true
  },
  address: { // 訂購者地址
    type: String,
  },
  details: { // 訂購明細
    type: Array,
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