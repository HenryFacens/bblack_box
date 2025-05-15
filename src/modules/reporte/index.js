const ReporteController = require('./reporte.controller');
const ReporteService = require('./reporte.service');
const ErrorHandler = require('../../shared/error-handler');

const reporteService = new ReporteService();
const errorHandler = new ErrorHandler();
const reporteController = new ReporteController(reporteService, errorHandler);

module.exports = reporteController;