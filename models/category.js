var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  description: { type: String, required: true }
});

CategorySchema
  .virtual('url')
  .get(function() {
    return '/catalog/category/' + this._id;
  });

module.exports = mongoose.model('Category', CategorySchema);