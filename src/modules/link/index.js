const LinkController = require('./link.controller');
const LinkService = require('./link.service');
const ErrorHandler = require('../../shared/error-handler');

const linkService = new LinkService();
const errorHandler = new ErrorHandler();
const linkController = new LinkController(linkService, errorHandler);

module.exports = linkController;