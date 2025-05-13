const AuthController = require('./auth.controller');
const AuthService = require('./auth.service');
const ErrorHandler = require('../../shared/error-handler');

const authService = new AuthService();
const errorHandler = new ErrorHandler();
const authController = new AuthController(authService, errorHandler);

module.exports = authController;