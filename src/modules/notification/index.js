const NotificationController = require('./notification.controller');
const NotificationService = require('./notification.service');
const ErrorHandler = require('../../shared/error-handler');

const notificationService = new NotificationService();
const errorHandler = new ErrorHandler();
const notificationController = new NotificationController(notificationService, errorHandler);

module.exports = notificationController;