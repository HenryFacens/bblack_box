const StatusController = require('./status.controller');
const StatusService = require('./status.service');
const ErrorHandler = require('../../shared/error-handler');

const statusService = new StatusService();
const errorHandler = new ErrorHandler();
const statusController = new StatusController(statusService, errorHandler);

module.exports = statusController;