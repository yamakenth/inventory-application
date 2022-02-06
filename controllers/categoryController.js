var Category = require('../models/category');
var Product = require('../models/product');

var async = require('async');
var { body, validationResult } = require("express-validator");

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
exports.category_create_post = [
  body('name', 'Category name required').trim().isLength({ min: 1 }).escape(),
  body('description', 'Description of category requried').trim().isLength({ min: 1 }).escape(),
  function(req, res, next) {
    var errors = validationResult(req);
    var category = new Category({
      name: req.body.name,
      description: req.body.description
    });
    if (!errors.isEmpty()) {
      res.render('category_form', {
        title: 'Add New Category',
        category: category,
        errors: errors.array()
      });
    } else {
      Category.findOne({ 'name': req.body.name })
        .exec(function(err, found_category) {
          if (err) return next(err);
          if (found_category) {
            res.redirect(found_category.url);
          } else {
            category.save(function(err) {
              if (err) return next(err);
              res.redirect(category.url);
            });
          }
        });
    }
  }
];

// display category delete form on GET 
exports.category_delete_get = function(req, res, next) {
  async.parallel(
    {
      category: function(callback) {
        Category.findById(req.params.id).exec(callback);
      },
      category_products: function(callback) {
        Product.find({ 'category': req.params.id }).exec(callback);
      }
    },
    function(err, results) {
      if (err) return next(err);
      if (results.category == null) {
        res.redirect('/catalog/categories');
      }
      res.render('category_delete', { 
        title: 'Delete Category', 
        category: results.category,
        category_products: results.category_products
      });
    }
  );
}

// handle category delete on POST
exports.category_delete_post = function(req, res, next) {
  async.parallel(
    {
      category: function(callback) {
        Category.findById(req.body.categoryid).exec(callback);
      },
      category_products: function(callback) {
        Product.find({ 'category': req.body.categoryid }).exec(callback);
      }
    },
    function(err, results) {
      if (err) return next(err);
      if (results.category_products.length > 0) {
        res.render('category_delete', { 
          title: 'Delete Category', 
          category: results.category,
          category_products: results.category_products
        });
      } else {
        Category.findByIdAndRemove(req.body.categoryid, function deleteCategory(err) {
          if (err) return next(err);
          res.redirect('/catalog/categories');
        });
      }
    }
  );
}

// display category update form on GET 
exports.category_update_get = function(req, res) {
  res.send('NOT IMPLEMENTED: category_update_get');
}

// handle category update on POST
exports.category_update_post = function(req, res) {
  res.send('NOT IMPLEMENTED: category_update_post');
}