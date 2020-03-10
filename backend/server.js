const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan')
const db = require('./models');
const cors = require('cors');
const app = express();
const sesClient = require('./ses-client')
//env setup
require('dotenv').config();
const PORT = process.env.PORT;
const routes = require('./routes');

//-----Middleware---//
const coresOptions = {
  origin: ['http://localhost:3000', 'http://amazingshellyyy.com','https://amazingshellyyy.com', 'http://amazingshelly.github.com'],
  credentials: true,
  optionsSuccessStatus: 200
}

app.use(morgan('dev'));
app.use(cors(coresOptions))
app.use(bodyParser.json());

//-----Routes----//
app.get('/', (req, res) => {
  // sesClient.sendEmail('amazingshellyyy@gmail.com', 'Hey!Welcome to startkisker', 'this is a test email');
  res.send('Hello world')
})


app.use('/api/v1/auth', routes.auth);






app.listen(PORT, () => {
  console.log(`Server connected at http://localhost:${PORT}`)
});
