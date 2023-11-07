const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProductSchema = new Schema({
  type: { // 類別
    type: String,
    required: true
  },
  status: { // 狀態（0:停用，1:啟用）
    type: String,
    required: true
  },
  name: { // 品名
    type: String,
    required: true
  },
  describe: { // 商品描述（烘焙程度/產地...）
    type: String,
  },
  cost: { // 成本售價
    type: Number,
  },
  retail: { // 零售價格
    type: Number,
  },
  discount: { // 折扣金額
    type: Number,
  },
  directions: { // 包裝說明
    type: String,
  },
  preserve: { // 保存方式
    type: String,
  },
  weight: { // 重量
    type: String,
  },
  ingredient: { // 成份
    type: String,
  },
  nutritionFacts: { // 營養標示
    type: String,
  },
  exp: { // 保存期限
    type: String,
  },
  img: { // 圖片
    type: String,
  },
  popular: { // 是否為熱門商品
    type: Boolean,
  },
  style: { // 樣式
    type: String,
  },
  order: { // 排序
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

module.exports = Product = mongoose.model('product', ProductSchema);