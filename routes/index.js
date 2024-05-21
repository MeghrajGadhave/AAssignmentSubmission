const express = require('express');
const homeController = require('../controller/home_controller');
const passport = require('passport');
const router = express.Router();

//home
router.get('/', passport.checkAuthenticationUser, homeController.home);

//signin page
router.get('/signin', homeController.signIn);

//signup page
router.get('/signup', homeController.signUp);

//signout func
router.get('/signout', homeController.signOut);

//forgot password page
router.get('/forgot-password', homeController.forgotPasswordPage);

//admin
router.use('/admin', require('./admin'))

//category
router.use('/category', require('./category'));

//product
router.use('/product', require('./product'));

//v1
router.use('/v1', require('./v1/index'));

module.exports = router;