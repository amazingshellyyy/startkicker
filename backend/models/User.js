const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const deepPopulate = require('mongoose-deep-populate')(mongoose);


const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Userame is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  ownPj: [{
    type: Schema.Types.ObjectId,
    ref: 'Project'
  }],
  supportPj:[{
    type: Schema.Types.ObjectId,
    ref: 'Project'
  }],
  selectPlan: [{
    type: Schema.Types.ObjectId,
    ref: 'Plan'
  }]
});
UserSchema.plugin(deepPopulate);
const User = mongoose.model('User', UserSchema);

module.exports = User;
