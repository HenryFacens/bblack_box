const express = require('express')
const router = express.Router()
const statusController = require('./status.controller')
const { authorizeRoles } = require('../../middleware/auth.middleware');

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
router.get('/get', authorizeRoles('admin'), statusController.listStatus);

/**
 * @swagger
 * /api/status/update/{reporteId}:
 *   patch:
 *     tags:
 *       - Status
 *     summary: Atualiza o status de um reporte
 *     description: Atualiza o status de um reporte e cria uma notificação para o usuário responsável
 *     parameters:
 *       - name: reporteId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do reporte a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newStatus:
 *                 type: string
 *     responses:
 *       200:
 *         description: Status atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Token não fornecido ou inválido
 *       404:
 *         description: Reporte não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.patch('/update/:reporteId', authorizeRoles('admin', 'externo'), statusController.updateStatusReporte);

module.exports = router;