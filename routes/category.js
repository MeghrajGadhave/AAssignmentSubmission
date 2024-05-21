const express = require('express');
const categoryController = require('../controller/category_controller');
const passport = require('passport');
const router = express.Router();

//show all category
router.get('/', passport.checkAuthenticationUser, categoryController.showCategory);

//create category page
router.get('/create', passport.checkAuthenticationUser, categoryController.createCategoryPage);

//create 
router.post('/create', passport.checkAuthenticationUser, categoryController.create);

//delete 
router.get('/delete', passport.checkAuthenticationUser, categoryController.delete);

//update status 
router.get('/update-status', passport.checkAuthenticationUser, categoryController.updateStatus);

module.exports = router;