var Product = require('../models/product');
var Category = require('../models/category');
var Manufacturer = require('../models/manufacturer');

var async = require('async');

// display home page 
exports.index = function(req, res) {
  async.parallel(
    {
      product_count: function(callback) {
        Product.countDocuments({}, callback);
      },
      category_count: function(callback) {
        Category.countDocuments({}, callback);
      },
      manufacturer_count: function(callback) {
        Manufacturer.countDocuments({}, callback);
      }
    },
    function(err, results) {
      res.render('index', { title: 'Home', error: err, data: results });
    }
  );
}

// display list of all products 
exports.product_list = function(req, res, next) {
  Product.find({}, 'name manufacturer stock')
    .sort({ name: 1 })
    .populate('manufacturer')
    .exec(function(err, list_product) {
      if (err) return next(err);
      res.render('product_list', { title: 'Product List', product_list: list_product });
    });
}

// display detail page for a specific product 
exports.product_detail = function(req, res, next) {
  Product.findById(req.params.id)
    .sort({ name: 1 })
    .populate('manufacturer')
    .populate('category')
    .exec(function(err, product) {
      if (err) return next(err);
      res.render('product_detail', { title: product.name, product: product });
    });
}

// display product create form on GET 
exports.product_create_get = function(req, res) {
  res.render('product_form', { title: 'Add New Product' });
}

// handle product create on POST
exports.product_create_post = function(req, res) {
  res.send('NOT IMPLEMENTED: product_create_post');
}

// display product delete form on GET 
exports.product_delete_get = function(req, res) {
  res.send('NOT IMPLEMENTED: product_delete_get');
}

// handle product delete on POST
exports.product_delete_post = function(req, res) {
  res.send('NOT IMPLEMENTED: product_delete_post');
}

// display product update form on GET 
exports.product_update_get = function(req, res) {
  res.send('NOT IMPLEMENTED: product_update_get');
}

// handle product update on POST
exports.product_update_post = function(req, res) {
  res.send('NOT IMPLEMENTED: product_update_post');
}