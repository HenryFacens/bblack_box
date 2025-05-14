const UserController = require('./user.controller');
const UserService = require('./user.service');
const ErrorHandler = require('../../shared/error-handler');

const userService = new UserService();
const errorHandler = new ErrorHandler();
const userController = new UserController(userService, errorHandler);

module.exports = userController;