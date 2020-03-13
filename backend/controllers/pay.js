const db = require('../models');
require('dotenv').config();
const stripe = require('stripe')(`${process.env.STRIPE_KEY}`);

const createCustomer = async (req, res) => {
  const email = req.body.email;
  console.log(email)
  const username = req.body.username;
  console.log(username)
  try {
    const customer = await stripe.customers.create({
      email,
    });
    return customer;
  } catch (err) {
    throw err;
  }
};


const createPaymentIntent = async (req, res) => {
  
 
  try {
    const createdPaymentIntent = await stripe.paymentIntents.create(req.body);
    console.log(createPaymentIntent);
    res.json(createdPaymentIntent);
  } catch (err) {
    console.log(err)
  }
};


module.exports = {
  createCustomer,
  createPaymentIntent
}