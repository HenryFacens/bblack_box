const express = require('express');
const router = express.Router();
const notificationController = require('./notification.controller');
const { authorizeRoles } = require('../../middleware/auth.middleware');

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
router.get('/get', authorizeRoles('admin', 'externo', 'user'), notificationController.getNotificationByUser);

/**
 * @swagger
 * /api/notification/delete/{notificationId}:
 *   delete:
 *     tags:
 *       - Notification
 *     summary: Deleta uma notificação específica
 *     description: Deleta uma notificação específica do usuário logado
 *     parameters:
 *       - name: notificationId
 *         in: path
 *         required: true
 *         description: ID da notificação a ser deletada
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Notificação deletada com sucesso
 *       401:
 *         description: Token JWT ausente ou inválido
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/delete/:notificationId', authorizeRoles('admin', 'externo', 'user'), notificationController.deleteNotificationById);

/**
 * @swagger
 * /api/notification/delete-all:
 *   delete:
 *     tags:
 *       - Notification
 *     summary: Deleta todas as notificações do usuário logado
 *     description: Deleta todas as notificações do usuário logado
 *     responses:
 *       200:
 *         description: Todas as notificações deletadas com sucesso
 *       401:
 *         description: Token JWT ausente ou inválido
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/delete-all', authorizeRoles('admin', 'externo', 'user'), notificationController.deleteAllNotifications);

module.exports = router;