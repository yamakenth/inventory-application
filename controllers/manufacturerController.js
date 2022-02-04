var Manufacturer = require('../models/manufacturer');
var Product = require('../models/product');

var async = require('async');

// display list of all manufacturers 
exports.manufacturer_list = function(req, res, next) {
  Manufacturer.find()
    .sort({ name: 1 })
    .exec(function(err, list_manufacturer) {
      if (err) return next(err);
      res.render('manufacturer_list', { title: 'Manufacturer List', manufacturer_list: list_manufacturer });
    });
}

// display detail page for a specific manufacturer 
exports.manufacturer_detail = function(req, res, next) {
  async.parallel(
    {
      manufacturer: function(callback) {
        Manufacturer.findById(req.params.id)
          .sort({ name: 1 })
          .exec(callback);
      },
      products: function(callback) {
        Product.find({ 'manufacturer': req.params.id })
          .populate('category')
          .sort({ name: 1 })
          .exec(callback);
      }
    },
    function(err, results) {
      if (err) return next(err);
      res.render('manufacturer_detail', { title: results.manufacturer.name, data: results });
    }
  );
}

// display manufacturer create form on GET 
exports.manufacturer_create_get = function(req, res) {
  res.send('NOT IMPLEMENTED: manufacturer_create_get');
}

// handle manufacturer create on POST
exports.manufacturer_create_post = function(req, res) {
  res.send('NOT IMPLEMENTED: manufacturer_create_post');
}

// display manufacturer delete form on GET 
exports.manufacturer_delete_get = function(req, res) {
  res.send('NOT IMPLEMENTED: manufacturer_delete_get');
}

// handle manufacturer delete on POST
exports.manufacturer_delete_post = function(req, res) {
  res.send('NOT IMPLEMENTED: manufacturer_delete_post');
}

// display manufacturer update form on GET 
exports.manufacturer_update_get = function(req, res) {
  res.send('NOT IMPLEMENTED: manufacturer_update_get');
}

// handle manufacturer update on POST
exports.manufacturer_update_post = function(req, res) {
  res.send('NOT IMPLEMENTED: manufacturer_update_post');
}