const express = require('express');
const {PlanController} = require('../../controllers');
const {checkAuth} = require('../../middlewares');
const router = express.Router();

router.get('/plans', PlanController.getPlans);
router.get('/plans/:id', PlanController.getPlanById);
router.post('/plans', checkAuth.checkAuthAdmin, PlanController.createPlan);
router.put('/plans/:id', checkAuth.checkAuthAdmin, PlanController.updatePlan);
router.delete('/plans/:id', checkAuth.checkAuthAdmin, PlanController.deletePlan);

module.exports = router;
