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


  delete req.body.metadata.backers;
  delete req.body.metadata.content;


  try{
    const UpdatedPlan = await db.Plan.findOne({_id:selectPlan});
    UpdatedPlan.backers.push(userId);
    await UpdatedPlan.save();
    const foundProject = await db.Project.findById(supportPj);
    foundProject.backers.push(userId);
    foundProject.backersNum = foundProject.backersNum +1
    foundProject.balance = foundProject.balance+req.body.amount/100;
    await foundProject.save();
    const UpdatedUser = await db.User.findById(userId);
    UpdatedUser.supportPj.push(supportPj);
    UpdatedUser.selectPlan.push(selectPlan);
    await UpdatedUser.save();
    const createdPaymentIntent = await stripe.paymentIntents.create(req.body);
    res.status(200).json(createdPaymentIntent);
  } catch (err) {
    
    console.log(err)
  }
};


module.exports = {
  createCustomer,
  createPaymentIntent
}