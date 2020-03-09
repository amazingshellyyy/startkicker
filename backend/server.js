const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan')
const db = require('./models');
const cors = require('cors');
const app = express();

//env setup
require('dotenv').config();
const PORT = process.env.PORT;
// const routes = require('./routes');

//-----Middleware---//
const coresOptions = {
  origin: ['http://localhost:3000', 'http://amazingshellyyy.com','https://amazingshellyyy.com', 'http://amazingshelly.github.com'],
  optionsSuccessStatus: 200
}


app.use(cors(coresOptions))
app.use(bodyParser.json());

//-----Routes----//
app.get('/', (req, res) => {
  res.send('Hello world')
})






app.listen(PORT, () => {
  console.log(`Server connected at http://localhost:${PORT}`)
});
