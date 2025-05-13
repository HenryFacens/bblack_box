const AdminController = require('./admin.controller');
const AdminService = require('./admin.service');
const AdminValidator = require('./admin.validator');
const AdminRepository = require('./admin.repository');
const ErrorHandler = require('../../shared/error-handler');
const AuthService = require('../../services/authService')
const { User } = require('../../models');

const adminRepository = new AdminRepository(User);
const adminValidator = new AdminValidator();
const errorHandler = new ErrorHandler();
const authService = new AuthService();
const adminService = new AdminService(adminRepository, adminValidator);
const adminController = new AdminController(adminService, authService, errorHandler);

module.exports = adminController;