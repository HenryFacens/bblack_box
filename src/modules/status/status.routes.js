const express = require('express')
const router = express.Router()
const statusController = require('./status.controller')

/**
 * @swagger
 * tags:
 *   name: Status
 *   description: Rotas de visualização de status
 */

/**
 * @swagger
 * /api/status/get:
 *   get:
 *     tags:
 *       - Status
 *     summary: Retorna status
 *     description: Retorna todos os status de reporte disponíveis
 *     responses:
 *       200:
 *         description: Status disponíveis
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/get', statusController.listStatus);

module.exports = router;