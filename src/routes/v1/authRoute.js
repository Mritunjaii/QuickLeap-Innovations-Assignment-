const express = require('express');
const {AuthController} = require('../../controllers');
const {checkAuth} = require('../../middlewares');
const router = express.Router();

router.post('/login',checkAuth.validateAuthRequest, AuthController.login);
router.post('/register',checkAuth.validateAuthRequest, AuthController.register);
router.post('/admin',checkAuth.validateAuthRequest, AuthController.adminLogin);

module.exports = router;
