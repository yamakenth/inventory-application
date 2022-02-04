var Category = require('../models/category');
var Product = require('../models/product');

var async = require('async');

// display list of all categorys 
exports.category_list = function(req, res, next) {
  Category.find()
    .sort({ name: 1 })
    .exec(function(err, list_category) {
      if (err) return next(err);
      res.render('category_list', { title: 'Category List', category_list: list_category });
    });
}

// display detail page for a specific category 
exports.category_detail = function(req, res, next) {
  async.parallel(
    {
      category: function(callback) {
        Category.findById(req.params.id)
          .sort({ name: 1 })
          .exec(callback);
      },
      products: function(callback) {
        Product.find({ 'category': req.params.id })
          .populate('manufacturer')
          .sort({ name: 1 })
          .exec(callback);
      }
    },
    function(err, results) {
      if (err) return next(err);
      res.render('category_detail', { title: results.category.name, data: results });
    }
  );
}

// display category create form on GET 
exports.category_create_get = function(req, res) {
  res.send('NOT IMPLEMENTED: category_create_get');
}

// handle category create on POST
exports.category_create_post = function(req, res) {
  res.send('NOT IMPLEMENTED: category_create_post');
}

// display category delete form on GET 
exports.category_delete_get = function(req, res) {
  res.send('NOT IMPLEMENTED: category_delete_get');
}

// handle category delete on POST
exports.category_delete_post = function(req, res) {
  res.send('NOT IMPLEMENTED: category_delete_post');
}

// display category update form on GET 
exports.category_update_get = function(req, res) {
  res.send('NOT IMPLEMENTED: category_update_get');
}

// handle category update on POST
exports.category_update_post = function(req, res) {
  res.send('NOT IMPLEMENTED: category_update_post');
}