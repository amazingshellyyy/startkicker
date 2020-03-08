const mongoose = require('mongoose');
require('dotenv').config();
const dbUrl = process.env.MONGO_URI;

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
})
  .then(()=> console.log('MongoDB connected...'))
  .catch((err) => console.log(`MongoDB connection error : ${err}`))

  module.exports = {
    
  }