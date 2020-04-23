const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan')
const db = require('./models');
const cors = require('cors');
const app = express();

//env setup
require('dotenv').config();
const PORT = process.env.PORT;
const routes = require('./routes');
const stripe = require('stripe')(`${process.env.STRIPE_KEY}`);


//-----Middleware---//
const originList = ['http://localhost:3000', 'https://www.amazingshellyyy.com','https://amazingshellyyy.com']
const coresOptions = {
  origin: function(origin, callback) {
      if (originList.indexOf(origin) !== -1) {
          callback(null, true)
      } else {
          callback(new Error('Not allow by cors'))
      }
  },
  credentials: true,
  optionsSuccessStatus: 200
}

app.use(morgan('dev'));
app.use(cors(coresOptions));
app.use(bodyParser.json());

//-----Routes----//
app.get('/', (req, res) => {
  res.send('Hello world')
})


app.use('/api/v1/auth', routes.auth);
app.use('/api/v1/pay', routes.pay);
app.use('/api/v1/project', routes.project);
app.use('/api/v1/plan', routes.plan);
app.use('/api/v1/user', routes.user);





app.listen(PORT, () => {
  console.log(`Server connected at http://localhost:${PORT}`)
});
