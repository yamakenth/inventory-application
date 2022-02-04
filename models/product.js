var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  description: [{ type: String, required: true }],
  manufacturer: { type: Schema.Types.ObjectId, ref: 'Manufacturer' },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  price: { type: Number, min: 0, required: true },
  stock: { type: Number, min: 0, required: true }
});

ProductSchema
  .virtual('url')
  .get(function() {
    return '/catalog/product/' + this._id;
  });

ProductSchema
  .virtual('price_formatted')
  .get(function() {
    var formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
    return formatter.format(this.price);
  });

module.exports = mongoose.model('Product', ProductSchema);