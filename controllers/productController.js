var Product = require('../models/product');
var Category = require('../models/category');
var Manufacturer = require('../models/manufacturer');

var async = require('async');
var { body, validationResult } = require("express-validator");

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
exports.product_create_get = function(req, res, next) {
  async.parallel(
    {
      categories: function(callback) {
        Category.find(callback);
      },
      manufacturers: function(callback) {
        Manufacturer.find(callback);
      }
    },
    function(err, results) {
      if (err) return next(err);
      res.render('product_form', { 
        title: 'Add New Product', 
        categories: results.categories,  
        manufacturers: results.manufacturers
      });
    }
  );
}

exports.product_create_post = function(req, res) {
  res.send('building now');
}

/*
// handle product create on POST
exports.product_create_post = [
  body('name', 'Product name required').trim().isLength({ min: 1 }).escape(),
  body('manufacturer', 'Manufacturer is required').trim().isLength({ min: 1 }).escape(),
  body('category', 'Category is required').trim().isLength({ min: 1 }).escape(),
  body('price', 'Price is required').trim().isLength({ min: 1 }).escape(),
  body('stock', 'Stock is required').trim().isLength({ min: 1 }).escape(),
  // refactor to use regex
  body('description_0', 'Description is required').trim().isLength({ min: 1 }).escape(),
  body('description_1', 'Description is required').trim().isLength({ min: 1 }).escape(),
  body('description_2', 'Description is required').trim().isLength({ min: 1 }).escape(),
  body('description_3', 'Description is required').trim().isLength({ min: 1 }).escape(),
  body('description_4', 'Description is required').trim().isLength({ min: 1 }).escape(),
  body('description_5', 'Description is required').trim().isLength({ min: 1 }).escape(),
  body('description_6', 'Description is required').trim().isLength({ min: 1 }).escape(),
  body('description_7', 'Description is required').trim().isLength({ min: 1 }).escape(),
  body('description_8', 'Description is required').trim().isLength({ min: 1 }).escape(),
  body('description_9', 'Description is required').trim().isLength({ min: 1 }).escape(),

  function(req, res, next) {
    var errors = validationResult(req);
    var product = new Product({
      name: req.body.name,
      // refactor
      description: [
        req.body.description_0,
        req.body.description_1,
        req.body.description_2,
        req.body.description_3,
        req.body.description_4,
        req.body.description_5,
        req.body.description_6,
        req.body.description_7,
        req.body.description_8,
        req.body.description_9
      ],
      manufacturer: req.body.manufacturer,
      category: req.body.category,
      price: req.body.price,
      stock: req.body.stock
    });
    if (!errors.isEmpty()) {
      async.parallel(
        {

        },
        function(err, results) {
          if (err) return next(err);

        }
      );
    }

  }
];
*/

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