const express = require('express');
const router = express.Router();
const reporteCoordsController = require('./index');
const { authorizeRoles } = require('../../middleware/auth.middleware');

/**
 * @swagger
 * /api/heatmap/coords:
 *   get:
 *     tags:
 *       - Heatmap
 *     summary: Retorna coordenadas dos reportes
 *     description: Retorna latitude e longitude de todos os reportes
 *     responses:
 *       200:
 *         description: Coordenadas dos reportes
 */
router.get(
  '/coords',
  authorizeRoles('admin', 'externo', 'user'),
  reporteCoordsController.getReportesCoords.bind(reporteCoordsController)
);

module.exports = router;