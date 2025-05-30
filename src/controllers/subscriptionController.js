const { SuccessResponse, ErrorResponse } = require("../utils/common");
const { StatusCodes } = require("http-status-codes");
const { SubscriptionService } = require("../services");
const { success } = require("../utils/common/success-response");


async function getSubs(req, res) {
  try {
    const { id } = req.params;
    const subscription = await SubscriptionService.getSubs(id);
    SuccessResponse.data = subscription;
    SuccessResponse.message = "Subscription fetched successfully";
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    console.error(error);
    ErrorResponse.error = error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}
async function createSubs(req, res) {
  try {
    const subscriptionData = {
        userId: req.user.id, 
        plan: req.body.plan,
        status: req.body.status || 'ACTIVE',
        startDate: req.body.startDate || new Date(),
    }
    if (!subscriptionData.plan || !subscriptionData.userId) {
      ErrorResponse.error = "Plan and User ID are required";
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    const newSubscription = await SubscriptionService.createSubs(subscriptionData);
    SuccessResponse.data = newSubscription;
    SuccessResponse.message = "Subscription created successfully";
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    console.error(error);
    ErrorResponse.error = error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}
async function updateSubs(req, res) {
  try {
    const { id } = req.params;
    const subscriptionData = req.body;
    const updatedSubscription = await SubscriptionService.updateSubs(id, subscriptionData);
    SuccessResponse.data = updatedSubscription;
    SuccessResponse.message = "Subscription updated successfully";
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    console.error(error);
    ErrorResponse.error = error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}
async function deleteSubs(req, res) {
  try {
    const { id } = req.params;
    await SubscriptionService.deleteSubs(id);
    SuccessResponse.message = "Subscription deleted successfully";
    return res.status(StatusCodes.NO_CONTENT).json(SuccessResponse);
  } catch (error) {
    console.error(error);
    ErrorResponse.error = error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}
module.exports = {
  getSubs,
  createSubs,
  updateSubs,
  deleteSubs
};