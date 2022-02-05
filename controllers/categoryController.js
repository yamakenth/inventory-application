var Category = require('../models/category');
var Product = require('../models/product');

var async = require('async');

// display list of all categorys 
exports.category_list = function(req, res, next) {
  async.parallel(
    {
      categories: function(callback) {
        Category.find()
          .sort({ name: 1 })
          .exec(callback);
      },
      product_count: function(callback) {
        Product.aggregate([{ $group: { _id: '$category', count: { $sum: 1 } } }])
          .exec(callback);
      }
    },
    function(err, results) {
      if (err) return next(err);
      res.render('category_list', { title: 'Category List', data: results });
    }
  );
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
  res.render('category_form', { title: 'Add New Category' });
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