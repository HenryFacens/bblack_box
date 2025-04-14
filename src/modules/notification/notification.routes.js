const express = require('express');
const router = express.Router();
const notificationController = require('./notification.controller');

/**
 * @swagger
 * tags:
 *   name: Notification
 *   description: Rotas para notificações
 */

/**
 * @swagger
 * /api/notification/get:
 *   get:
 *     tags:
 *       - Notification
 *     summary: Retorna notificações do usuário logado
 *     description: Retorna todas as notificações do usuário logado
 *     responses:
 *       200:
 *         description: Notificações
 *       401:
 *         description: Token JWT ausente ou inválido
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/get', notificationController.getNotificationByUser);

module.exports = router;