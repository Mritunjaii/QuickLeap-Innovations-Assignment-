const { SubscriptionRepository } = require('../repositories');
const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');

const SubscriptionRepo = new SubscriptionRepository();

async function getSubs(userId) {
    try {
        const subscription = await SubscriptionRepo.get(userId);
        if (!subscription) {
            throw new AppError('Subscription not found', StatusCodes.NOT_FOUND);
        }
        return subscription;
    } catch (error) {
        console.error('Error fetching subscription:', error);
        throw new AppError('Failed to fetch subscription', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function createSubs(subscriptionData) {
    try {
        
        const newSubscription = await SubscriptionRepo.create(subscriptionData);
        return newSubscription;
    } catch (error) {
        console.error('Error creating subscription:', error);
        throw new AppError('Failed to create subscription', StatusCodes.INTERNAL_SERVER_ERROR);
    } 
}


async function updateSubs(subscriptionId, subscriptionData) {
    try {
        const updatedSubscription = await SubscriptionRepo.update(subscriptionId, subscriptionData);
        if (!updatedSubscription) {
            throw new AppError('Subscription not found', StatusCodes.NOT_FOUND);
        }
        return updatedSubscription;
    }
    catch (error) {
        console.error('Error updating subscription:', error);
        throw new AppError('Failed to update subscription', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function deleteSubs(subscriptionId) {
    try {
        const deletedSubscription = await SubscriptionRepo.destroy(subscriptionId);
        if (!deletedSubscription) {
            throw new AppError('Subscription not found', StatusCodes.NOT_FOUND);
        }
        return deletedSubscription;
    }
    catch (error) {
        console.error('Error deleting subscription:', error);
        throw new AppError('Failed to delete subscription', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    getSubs,
    createSubs,
    updateSubs,
    deleteSubs
};
