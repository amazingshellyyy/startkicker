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
  // console.log(supportPj)
  delete req.body.metadata.backers;
  console.log('after-backers')
  delete req.body.metadata.content;
  console.log(req.body)

  try{
    const UpdatedPlan = await db.Plan.findById(selectPlan);
    UpdatedPlan.backers.push(userId);
    await UpdatedPlan.save();
    console.log('UpdatedPlan',UpdatedPlan )
    await db.Project.findByIdAndUpdate(supportPj,{$inc: {backersNum: 1,balance:-(req.body.amount/100)}},{new: true});
    const UpdatedUser = await db.User.findById(userId);
    UpdatedUser.supportPj.push(supportPj);
    UpdatedUser.selectPlan.push(selectPlan);
    await UpdatedUser.save();
    console.log('UpdatedUser',UpdatedUser)
    console.log('2')
    const createdPaymentIntent = await stripe.paymentIntents.create(req.body);
    // console.log(createPaymentIntent);
    // console.log(UpdatedUser);
    res.status(200).json(createdPaymentIntent);
  } catch (err) {
    console.log('intent')
    console.log(err)
  }
};


module.exports = {
  createCustomer,
  createPaymentIntent
}