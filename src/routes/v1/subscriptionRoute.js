const express = require('express');
const {SubscriptionController} = require('../../controllers');
const {checkAuth} = require('../../middlewares');
const router = express.Router();


router.get('/:id',checkAuth.checkAuthUser,SubscriptionController.getSubs)
router.post('/', checkAuth.checkAuthUser, SubscriptionController.createSubs);
router.put('/:id', checkAuth.checkAuthUser, SubscriptionController.updateSubs);
router.delete('/:id', checkAuth.checkAuthUser, SubscriptionController.deleteSubs);

module.exports = router;
