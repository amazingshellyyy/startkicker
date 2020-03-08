const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
const app = express();

//env setup
require('dotenv').config();
const PORT = process.env.PORT;
// const routes = require('./routes');

//-----Middleware---//
app.use(bodyParser.json());

//-----Routes----//
app.get('/', (req, res) => {
  res.send('Hello world')
})




app.listen(PORT, () => {
  console.log(`Server connected at http://localhost:${PORT}`)
});
