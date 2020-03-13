const bcrypt = require('bcrypt');
const db = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const sesClient = require('../ses-client')

const signup = (req, res) => {
  const userData = req.body;
  console.log(userData);
  /* Validating Sign up Form */
  if (!userData.username && !userData.email && !userData.password) {
    return res.status(400).json({ message: 'All fileds are required' })
  }

  //check for existing user account
  db.User.findOne({ email: userData.email }, (err, foundUser) => {
    if (err) return res.status(400).json({ message: 'Bad request, tyr again' });

    //return error if account alraedy exist
    if (foundUser) return res.status(400).json({ message: 'Email is already been registered, please try again' });

    //if doesn't exist, we generate hash Salt ( make the password hard to crack)
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return res.status(400).json({ message: 'Something went wrong, try again' });
      bcrypt.hash(userData.password, salt, (err, hash) => {
        if (err) return res.status(400).json({ message: 'Something went wrong, try again' });
    
        const { username, email, password } = req.body;
        const newUser = {
          username: username,
          email: email,
          password: hash
        }
        db.User.create(newUser, (err, createdUser) => {
          if (err) return res.status(400).json({ message: "Bad Request, Please try again", err: err.errmsg });
          jwt.sign({ foo: createdUser._id }, `${process.env.JWT_SECRET}`, { expiresIn: '10h' }, (err, jwt) => {
            if (err) return res.status(500).json({
              status: 503,
              errors: [{ message: 'access forbidden' }],
            });
            if (`${process.env.NODE_ENV}`=="prod") {
              sesClient.sendEmail(`${createdUser.email}`, 'Hey!Welcome to startkisker', 'this is a testtttt email', 'amazingshellyyy@gmail.com',res, jwt, createdUser._id);
            }else{
              res.status(200).json({ jwt , userId: createdUser._id});
            }
          });
        });


      });
    });

  });

}

const login = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      status: 400,
      errors: [{ message: 'Please enter your email and password' }],
    });
  }
  db.User.findOne({ email: req.body.email }, (err, foundUser) => {


    if (err) return res.status(500).json({
      status: 500,
      errors: [{ message: 'Something went wrong. Please try again' }],
    });
    if (!foundUser) {
      return res.status(400).json({
        status: 400,
        errors: [{ message: 'Username or password is incorrect' }],
      });
    }
    bcrypt.compare(req.body.password, foundUser.password, (err, isMatch) => {
      if (err) return res.status(500).json({
        status: 500,
        errors: [{ message: 'Something went wrong. Please try again' }],
      });
      if (isMatch) {
        /* jwt */
        jwt.sign({ foo: foundUser._id }, `${process.env.JWT_SECRET}`, { expiresIn: '10h' }, (err, jwt) => {
          if (err) return res.status(500).json({
            status: 503,
            errors: [{ message: 'access forbidden' }],
          });
          res.status(200).json({ jwt , userId: foundUser._id});
          // res.status(201).json({message: 'Logged In'});
        });
      } else {
        return res.json({
          status: 400,
          errors: [{ message: 'Username or password is incorrect' }],
        });
      }
    });
  });
};



module.exports = {
  signup,
  login,
  
}