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
  const userId = req.body.metadata.userId;
  const supportPj = req.body.metadata.project;
  const selectPlan = req.body.metadata._id;
  const updateUser = {
    supportPj,
    selectPlan
  }
  try{
    const UpdatedUser = await db.User.findByIdAndUpdate(userId, updateUser, {new:true});
    const createdPaymentIntent = await stripe.paymentIntents.create(req.body);
    console.log(createPaymentIntent);
    // console.log(UpdatedUser);
    res.json(createPaymentIntent);
  } catch (err) {
    console.log(err)
  }
};


module.exports = {
  createCustomer,
  createPaymentIntent
}