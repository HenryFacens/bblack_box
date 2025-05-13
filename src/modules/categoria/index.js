const CategoriaController = require('./categoria.controller');
const CategoriaService = require('./categoria.service');
const ErrorHandler = require('../../shared/error-handler');

const categoriaService = new CategoriaService();
const errorHandler = new ErrorHandler();
const categoriaController = new CategoriaController(categoriaService, errorHandler);

module.exports = categoriaController;