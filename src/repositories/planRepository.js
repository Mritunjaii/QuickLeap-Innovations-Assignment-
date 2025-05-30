const crudRepository = require('./crud-repository');
const {Plan} = require('../models');
const AppError = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');

class PlanRepository extends crudRepository {
    constructor() {
        super(Plan);
    }
}


module.exports = PlanRepository;