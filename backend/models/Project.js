const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = mongoose.Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  image: {
    type: String,
  },
  plan: {
    type: Schema.Types.ObjectId,
    ref: 'Plan'
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  }
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;
