const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
require('dotenv').config();

// db連線uri
const db = require('./config/keys').MongoURI;
// API
const users = require('./routes/api/users');
const profiles = require('./routes/api/profiles');
const products = require('./routes/api/products');
const orders = require('./routes/api/orders');


// const express = require('express'),
//       app = express(),
//       bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8000;

// console.log(process.env.PORT)
// console.log(process.env["DB_HOST"]); 

mongoose.connect(db)
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.log(err));

// passpost初始化
app.use(passport.initialize());
// 帶入passport
require('./config/passport')(passport);

// 使用body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })


// 使用router
app.use('/api/users', users);
app.use('/api/profiles', profiles);
app.use('/api/products', products);
app.use('/api/orders', orders);

// if (process.env.NODE_ENV === 'production') {
  app.use(express.static('vue-client/dist'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'vue-client', 'dist', index.html))
  });
// }

app.listen(port, () => {
  console.log(`FCODE::: app listening on port ${port}`)
})