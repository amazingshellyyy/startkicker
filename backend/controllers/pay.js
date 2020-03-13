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

  // console.log(supportPj)
  delete req.body.metadata.backers;
  console.log('after-backers')
  delete req.body.metadata.content;
  console.log('req.body',req.body)

  try{
    console.log('in try')
    console.log('userId', userId)
    console.log('supportPj', supportPj)
    console.log('selectPlan', selectPlan)
    const UpdatedPlan = await db.Plan.findOne({_id:selectPlan});
    console.log('UpdatedPlan',UpdatedPlan )
    UpdatedPlan.backers.push(userId);
    await UpdatedPlan.save();
    console.log('UpdatedPlan2',UpdatedPlan )
    console.log(-(req.body.amount/100))
    const foundProject = await db.Project.findById(supportPj);
    foundProject.backers.push(userId);
    foundProject.backersNum = foundProject.backersNum +1
    foundProject.balance = foundProject.balance+req.body.amount;
    await foundProject.save();
    const UpdatedUser = await db.User.findById(userId);
    console.log('UpdatedUser',UpdatedUser)
    UpdatedUser.supportPj.push(supportPj);
    UpdatedUser.selectPlan.push(selectPlan);
    await UpdatedUser.save();
    console.log('UpdatedUser2',UpdatedUser)
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