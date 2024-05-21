const express = require('express');
const router = express.Router();

//admin
router.use('/admin', require('./admin'));

//product
router.use('/product', require('./product'))

module.exports = router;