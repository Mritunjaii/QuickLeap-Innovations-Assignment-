const crudRepository = require('./crud-repository');
const {Subscription} = require('../models');
const AppError = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');

class SubscriptionRepository extends crudRepository {
    constructor() {
        super(Subscription);
    }
}


module.exports = SubscriptionRepository;