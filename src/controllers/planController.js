const { SuccessResponse, ErrorResponse } = require("../utils/common");
const { StatusCodes } = require("http-status-codes");
const { PlanService } = require("../services");


async function getPlans(req, res) {
    try {
        const plans = await PlanService.getPlans();
        SuccessResponse.data=plans;
        SuccessResponse.message="plans fetched successfully";
        return res.status(StatusCodes.OK).json(SuccessResponse);
        
    } catch (error) {
        console.log(err);
        ErrorResponse.error = err;
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }    
}


async function getPlanById(req, res) {
    try {
        const planId = req.params.id;
        const plan = await PlanService.getPlanById(planId);
        if (!plan) {
            ErrorResponse.message = "Plan not found";
            return res.status(StatusCodes.NOT_FOUND).json(ErrorResponse);
        }
        SuccessResponse.data = plan;
        SuccessResponse.message = "Plan fetched successfully";
        return res.status(StatusCodes.OK).json(SuccessResponse);
    }
    catch (error) {
        console.log(error);
        ErrorResponse.error = error;
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
}

async function createPlan(req, res) {
    try {
        const planData = {
            name: req.body.name,
            price: req.body.price,
            features: req.body.features,
            duration: req.body.duration
        };
        const newPlan = await PlanService.createPlan(planData);
        SuccessResponse.data = newPlan;
        SuccessResponse.message = "Plan created successfully";
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    }
    catch (error) {
        console.log(error);
        ErrorResponse.error = error;
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
}

async function updatePlan(req, res) {
    try {
        const planId = req.params.id;
        const planData = {
            name: req.body.name,
            price: req.body.price,
            features: req.body.features,
            duration: req.body.duration
        };
        const updatedPlan = await PlanService.updatePlan(planId, planData);
        if (!updatedPlan) {
            ErrorResponse.message = "Plan not found";
            return res.status(StatusCodes.NOT_FOUND).json(ErrorResponse);
        }
        SuccessResponse.data = updatedPlan;
        SuccessResponse.message = "Plan updated successfully";
        return res.status(StatusCodes.OK).json(SuccessResponse);
    }
    catch (error) {
        console.log(error);
        ErrorResponse.error = error;
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
}

async function deletePlan(req, res) {
    try {
        const planId = req.params.id;
        const deletedPlan = await PlanService.deletePlan(planId);
        if (!deletedPlan) {
            ErrorResponse.message = "Plan not found";
            return res.status(StatusCodes.NOT_FOUND).json(ErrorResponse);
        }
        SuccessResponse.data = deletedPlan;
        SuccessResponse.message = "Plan deleted successfully";
        return res.status(StatusCodes.OK).json(SuccessResponse);
    }
    catch (error) {
        console.log(error);
        ErrorResponse.error = error;
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
}

module.exports = {
    getPlans,
    getPlanById,
    createPlan,
    updatePlan,
    deletePlan
};
