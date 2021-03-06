var Manufacturer = require('../models/manufacturer');
var Product = require('../models/product');

var async = require('async');
var { body, validationResult } = require("express-validator");

// display list of all manufacturers 
exports.manufacturer_list = function(req, res, next) {
  async.parallel(
    {
      manufacturer_list: function(callback) {
        Manufacturer.find()
          .sort({ name: 1 })
          .exec(callback);
      },
      product_count: function(callback) {
        Product.aggregate([{ $group: { _id: '$manufacturer', count: { $sum: 1 } } }])
          .exec(callback);
      }
    },
    function(err, results) {
      if (err) return next(err);
      res.render('manufacturer_list', { title: 'Manufacturer List', data: results });
    }
  );
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
  res.render('manufacturer_form', { title: 'Add New Manufacturer' });
}

// handle manufacturer create on POST
exports.manufacturer_create_post = [
  body('name', 'Manufacturer name required').trim().isLength({ min: 1 }).escape(),
  function(req, res, next) {
    var errors = validationResult(req);
    var manufacturer = new Manufacturer({ name: req.body.name });
    if (!errors.isEmpty()) {
      res.render('manufacturer_form', { 
        title: 'Add New Manufacturer',  
        manufacturer: manufacturer,
        errors: errors.array()
      });
    } else {
      Manufacturer.findOne({ 'name': req.body.name })
        .exec(function(err, found_manufacturer) {
          if (err) return next(err);
          if (found_manufacturer) {
            res.redirect(found_manufacturer.url);
          } else {
            manufacturer.save(function(err) {
              if (err) return next(err);
              res.redirect(manufacturer.url);
            });
          }
        });
    }
  }
];

// display manufacturer delete form on GET 
exports.manufacturer_delete_get = function(req, res, next) {
  async.parallel(
    {
      manufacturer: function(callback) {
        Manufacturer.findById(req.params.id).exec(callback);
      },
      manufacturer_products: function(callback) {
        Product.find({ 'manufacturer': req.params.id }).exec(callback);
      }
    },
    function(err, results) {
      if (err) return next(err);
      if (results.manufacturer == null) {
        res.redirect('/catalog/manufacturers');
      }
      res.render('manufacturer_delete', { 
        title: 'Delete Manufacturer', 
        manufacturer: results.manufacturer,
        manufacturer_products: results.manufacturer_products
      });
    }
  );
}

// handle manufacturer delete on POST
exports.manufacturer_delete_post = function(req, res, next) {
  async.parallel(
    {
      manufacturer: function(callback) {
        Manufacturer.findById(req.body.manufacturerid).exec(callback);
      },
      manufacturer_products: function(callback) {
        Product.find({ 'manufacturer': req.body.manufacturerid }).exec(callback);
      }
    },
    function(err, results) {
      if (err) return next(err);
      if (results.manufacturer_products.length > 0) {
        res.render('manufacturer_delete', { 
          title: 'Delete Manufacturer', 
          manufacturer: results.manufacturer,
          manufacturer_products: results.manufacturer_products
        });
      } else {
        Manufacturer.findByIdAndRemove(req.body.manufacturerid, function deleteManufacturer(err) {
          if (err) return next(err);
          res.redirect('/catalog/manufacturers');
        });
      }
    }
  );
}

// display manufacturer update form on GET 
exports.manufacturer_update_get = function(req, res, next) {
  Manufacturer.findById(req.params.id).exec(function(err, manufacturer) {
    if (err) return next(err);
    if (manufacturer == null) {
      var err = new Error('Manufacturer not found');
      err.status = 404;
      return next(err);
    }
    res.render('manufacturer_form', { title: 'Update Manufacturer', manufacturer: manufacturer });
  });
}

// handle manufacturer update on POST
exports.manufacturer_update_post = [
  body('name', 'Manufacturer name required').trim().isLength({ min: 1 }).escape(),
  
  function(req, res, next) {
    var errors = validationResult(req);

    var manufacturer = new Manufacturer({ 
      name: req.body.name,
      _id: req.params.id
    });

    if (!errors.isEmpty()) {
      res.render('manufacturer_form', { 
        title: 'Update Manufacturer',  
        manufacturer: manufacturer,
        errors: errors.array()
      });
    } else {
      Manufacturer.findByIdAndUpdate(req.params.id, manufacturer, {}, function(err, themanufacturer) {
        if (err) return next(err);
        res.redirect(themanufacturer.url);
      });
    }
  }
];