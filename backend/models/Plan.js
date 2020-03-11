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
  estDelivery: {
    type: Date,
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project'
  },
  user:{
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  backers: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
});

const Plan = mongoose.model('Plan', PlanSchema);

module.exports = Plan;
