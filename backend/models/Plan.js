const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlanSchema = mongoose.Schema({
  title: {
    type: String,
  },
  subtitle: {
    type: String
  },
  content: {
    type: String,
  },
  price: {
    type: Number,
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project'
  },
  estDelivery: {
    type: Date,
  },
  shipDes: {
    type: String
  }
});

const Plan = mongoose.model('Plan', PlanSchema);

module.exports = Plan;
