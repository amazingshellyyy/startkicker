const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = mongoose.Schema({
  title: {
    type: String,
  },
  detail: {
    type: String,
  },
  project: [{
    type: Schema.Types.ObjectId,
    ref: 'Project',
  }],
 
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
