var express = require('express');
var router = express.Router();

var product_controller = require('../controllers/productController');
var manufacturer_controller = require('../controllers/manufacturerController');
var category_controller = require('../controllers/categoryController');

/// PRODUCT ROUTES ///

// GET catalog home page 
router.get('/', product_controller.index);

// GET request for creating a product 
router.get('/product/create', product_controller.product_create_get);
// POST request for creating a product 
router.post('/product/create', product_controller.product_create_post);

// GET request for deleting a product 
router.get('/product/:id/delete', product_controller.product_delete_get);
// POST request for deleting a product 
router.post('/product/:id/delete', product_controller.product_delete_post);

// GET request for updating a product 
router.get('/product/:id/update', product_controller.product_update_get);
// POST request for updating a product 
router.post('/product/:id/update', product_controller.product_update_post);

// GET request for one product 
router.get('/product/:id', product_controller.product_detail);

// GET request for all products 
router.get('/product', product_controller.product_list);

/// MANUFACTURER ROUTES /// 

// GET request for creating a manufacturer 
router.get('/manufacturer/create', manufacturer_controller.manufacturer_create_get);
// POST request for creating a manufacturer 
router.post('/manufacturer/create', manufacturer_controller.manufacturer_create_post);

// GET request for deleting a manufacturer 
router.get('/manufacturer/:id/delete', manufacturer_controller.manufacturer_delete_get);
// POST request for deleting a manufacturer 
router.post('/manufacturer/:id/delete', manufacturer_controller.manufacturer_delete_post);

// GET request for updating a manufacturer 
router.get('/manufacturer/:id/update', manufacturer_controller.manufacturer_update_get);
// POST request for updating a manufacturer 
router.post('/manufacturer/:id/update', manufacturer_controller.manufacturer_update_post);

// GET request for one manufacturer 
router.get('/manufacturer/:id', manufacturer_controller.manufacturer_detail);

// GET request for all manufacturers 
router.get('/manufacturer', manufacturer_controller.manufacturer_list);

/// CATEGORY ROUTES /// 

// GET request for creating a category 
router.get('/category/create', category_controller.category_create_get);
// POST request for creating a category 
router.post('/category/create', category_controller.category_create_post);

// GET request for deleting a category 
router.get('/category/:id/delete', category_controller.category_delete_get);
// POST request for deleting a category 
router.post('/category/:id/delete', category_controller.category_delete_post);

// GET request for updating a category 
router.get('/category/:id/update', category_controller.category_update_get);
// POST request for updating a category 
router.post('/category/:id/update', category_controller.category_update_post);

// GET request for one category 
router.get('/category/:id', category_controller.category_detail);

// GET request for all categories 
router.get('/category', category_controller.category_list);

module.exports = router;