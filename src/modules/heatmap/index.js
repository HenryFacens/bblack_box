const HeatmapController = require('./heatmap.controller');
const HeatmapService = require('./heatmap.service');
const ErrorHandler = require('../../shared/error-handler');

const heatmapService = new HeatmapService();
const errorHandler = new ErrorHandler();
const heatmapController = new HeatmapController(heatmapService, errorHandler);

module.exports = heatmapController;