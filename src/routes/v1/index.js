const express = require('express');

const router = express.Router();

router.use('/plans', require('./planRoute'));
router.use('/auth', require('./authRoute'));
router.use('/subscriptions',require('./subscriptionRoute'));

module.exports = router;
