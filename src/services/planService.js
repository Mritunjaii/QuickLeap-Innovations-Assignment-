const { PlanRepository } = require('../repositories');
const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');

const PlanRepo = new PlanRepository();

async function getPlans() {
    try {
        const plans = await PlanRepo.getAll();
        return plans;
    } catch (error) {
        console.error('Error fetching plans:', error);
        throw new AppError('Failed to fetch plans', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function getPlanById(planId) {
    try {
        const plan = await PlanRepo.get(planId);
        if (!plan) {
            throw new AppError('Plan not found', StatusCodes.NOT_FOUND);
        }
        return plan;
    } catch (error) {
        console.error('Error fetching plan by ID:', error);
        throw new AppError('Failed to fetch plan', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function createPlan(planData) {
    try {
        const newPlan = await PlanRepo.create(planData);
        return newPlan;
    } catch (error) {
        console.error('Error creating plan:', error);
        throw new AppError('Failed to create plan', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updatePlan(planId, planData) {
    try {
        const updatedPlan = await PlanRepo.update(planId, planData);
        if (!updatedPlan) {
            throw new AppError('Plan not found', StatusCodes.NOT_FOUND);
        }
        return updatedPlan;
    }
    catch (error) {
        console.error('Error updating plan:', error);
        throw new AppError('Failed to update plan', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function deletePlan(planId) {
    try {
        const deletedPlan = await PlanRepo.destroy(planId);
        if (!deletedPlan) {
            throw new AppError('Plan not found', StatusCodes.NOT_FOUND);
        }
        return deletedPlan;
    }
    catch (error) {
        console.error('Error deleting plan:', error);
        throw new AppError('Failed to delete plan', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
module.exports = {
    getPlans,
    getPlanById,
    createPlan,
    updatePlan,
    deletePlan
};