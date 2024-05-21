const express = require('express');
const adminController = require('../../controller/v1/admin_controller');
const router = express.Router();

//create session
router.post('/create-session', adminController.createSession);

module.exports = router;