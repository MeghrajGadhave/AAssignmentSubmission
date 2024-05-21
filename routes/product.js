const express = require('express');
const passport = require('passport');
const productController = require('../controller/product_controller');
const router = express.Router();

//show all products
router.get('/', passport.checkAuthenticationUser, productController.showProduct);

//create product page
router.get('/create', passport.checkAuthenticationUser, productController.createProductPage);

//create product
router.post('/create', passport.checkAuthenticationUser, productController.createProduct);

//delete product 
router.get('/delete', passport.checkAuthenticationUser, productController.deleteProduct);

//update status 
router.get('/update-status', passport.checkAuthenticationUser, productController.updateProductStaus);

module.exports = router;