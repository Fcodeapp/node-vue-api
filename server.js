const express = require('express');
const cors = require('cors');
const history = require('connect-history-api-fallback');
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


// const corsOptions = {
//   origin: [
//     'http://localhost:5173/',
//     'http://cms.fcode.pro/',
//     'https://cms.fcode.pro/',
//   ],
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
//   allowedHeaders: ['Content-Type', 'Authorization'],
// };

// app.use(cors(corsOptions));
app.use(cors());

if (process.env.NODE_ENV === 'production') {
  // app.use(express.static(__dirname + "/public"));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'public', index.html))
  });
  // app.use(history());
}

mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.log(err));



const connection = mongoose.connection;

connection.once('open', () => {
  console.log('mogoose connect!!!');
});


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


app.listen(port, () => {
  console.log(`FCODE::: app listening on port ${port}`)
})