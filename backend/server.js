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


app.use(cors());
app.use(morgan('dev'));
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
