const express = require('express');
const productController = require('../../controller/v1/product_controller');
const passport = require('passport');
const router = express.Router();

//view all or view specific product
router.get('/', passport.authenticate('jwt', { session: false }), productController.viewProduct);

//delete product
router.delete('/', passport.authenticate('jwt', { session: false }), productController.deleteProduct);

module.exports = router;